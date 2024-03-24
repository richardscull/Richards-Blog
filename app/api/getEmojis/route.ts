const CachedEmojiData = {} as Record<string, any>;
let CacheExpiresAt = 0;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const setId = searchParams.get("setId");

  if (!setId) {
    return new Response("Missing set id", { status: 400 });
  }

  if (CachedEmojiData[setId] && CacheExpiresAt > Date.now() / 1000) {
    return new Response(JSON.stringify(CachedEmojiData[setId]), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "public, max-age=" + Math.floor(CacheExpiresAt - Date.now() / 1000),
      },
    });
  }

  const emojis = await fetch("https://7tv.io/v3/emote-sets/" + setId)
    .then((res) => res.json())
    .then((data) => data.emotes);

  CachedEmojiData[setId] = emojis;
  CacheExpiresAt = Date.now() / 1000 + 86400;

  console.log(CacheExpiresAt);

  return new Response(JSON.stringify(emojis) as string, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
