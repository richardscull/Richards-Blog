"use client";
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
const replaceText = (setId: string) => {
  const elements = document.querySelectorAll("*:not(script):not(style)");
  fetch("https://7tv.io/v3/emote-sets/" + setId)
    .then((res) => res.json())
    .then((data) => data.emotes)
    .then((emojis: Emoji[]) => {
      elements.forEach((element) => {
        if (element.childElementCount > 0) return; // Don't replace emojis in elements with children
        if (element.tagName === "CODE") return; // Don't replace emojis in code blocks

        const words = element.innerHTML.split(" ");
        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          const emoji = emojis.find((emoji) => emoji.name === word);
          if (!emoji) continue;

          const emojiElement = `<span class="mr-1 ml-1">
          <Image
          style="display: inline-block; vertical-align: middle; margin: 0 auto; padding: 0;"
          src="https:${emoji.data.host.url}/${emoji.data.host.files[1].name}"
          alt="emoji"
          width="${emoji.data.host.files[1].width}"
          height="${emoji.data.host.files[1].height}"
          ></Image>
          </span>`;

          console.log(`Replaced ${word} with ${emojiElement}`);
          words[i] = emojiElement;
        }

        element.innerHTML = words.join(" ");
      });
    });
};

export default function EmojisParser() {
  // The set id is the id of the set of emojis you want to use
  const SET_ID = "655784ad9e081c7db7cc20d0";

  useEffect(() => {
    replaceText(SET_ID);
  }, []);

  return null;
}
