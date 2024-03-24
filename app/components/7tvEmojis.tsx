"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface Emoji {
  id: string;
  name: string;
  data: {
    host: {
      url: string;
      files: {
        [key: string]: {
          name: string;
          width: number;
          height: number;
        };
      };
    };
  };
}

// This function is used to replace all the text with 7tv emojis in the page
async function replaceText(setId: string) {
  const elements = Array.from(
    document.querySelectorAll("*:not(script):not(style)")
  );

  const url = window.location.origin;
  const emojis = (await fetch(`${url}/api/getEmojis?setId=` + setId, {
    cache: "force-cache",
  }).then((res) => res.json())) as Emoji[];

  elements.forEach((element) => {
    if (element.childElementCount > 0) {
      element.childNodes.forEach((child: Node) => {
        if (child.nodeType !== 3) return;

        const words = child.textContent!.split(" ");
        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          const emoji = emojis.find((emoji) => emoji.name === word);
          if (!emoji) continue;
          console.log(`Replaced ${word} with parent ${element.tagName}`);
          words[i] = getEmojiElement(emoji);
        }

        const spanElement = document.createElement("span");
        spanElement.innerHTML = words.join(" ");

        // Replace the original text node with the new span element

        element.replaceChild(spanElement, child);
      });

      return;
    }

    switch (element.tagName) {
      case "CODE":
      case "TITLE":
      case "META":
      case "LINK":
      case "STYLE":
        return;
    }

    if (element.id === "ignore-7tv") return;

    const words = element.innerHTML.split(" ");
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const emoji = emojis.find((emoji) => emoji.name === word);
      if (!emoji) continue;

      console.log(`Replaced ${word} with parent ${element.tagName}`);
      words[i] = getEmojiElement(emoji);
    }

    element.innerHTML = words.join(" ");
  });
}

export default function EmojisParser() {
  // The set id is the id of the set of emojis you want to use
  const SET_ID = "655784ad9e081c7db7cc20d0";
  const pathname = usePathname();

  useEffect(() => {
    replaceText(SET_ID);
  }, [pathname]);

  return null;
}

function getEmojiElement(emoji: Emoji) {
  return `<span class="mr-1 ml-1">
  <Image
  style="display: inline-block; vertical-align: middle; margin: 0 auto; padding: 0;"
  src="https:${emoji.data.host.url}/${emoji.data.host.files[1].name}"
  alt="emoji"
  width="${emoji.data.host.files[1].width}"
  height="${emoji.data.host.files[1].height}"
  ></Image>
  </span>`;
}
