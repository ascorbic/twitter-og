// Just need something that renders JSX. React works too.
/** @jsxImportSource https://esm.sh/preact */

import { ImageResponse } from "https://deno.land/x/og_edge/mod.ts";

const notoBold = await loadFont(
  "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans@latest/latin-800-normal.ttf"
);

const notoSans = await loadFont(
  "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans@latest/latin-500-normal.ttf"
);

function loadFont(name: string) {
  return fetch(name).then((res) => res.arrayBuffer());
}

const domain = "mk.gg";

export default function handler(req: Request) {
  const url = new URL(req.url);

  const title = url.searchParams.get("title");
  const description = url.searchParams.get("description");
  const image = url.searchParams.get("image");

  let imageUrl;
  try {
    imageUrl = new URL(image);
  } catch (e) {}

  return new ImageResponse(
    (
      <div
        style={{
          color: "black",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          width: 960,
          height: 480,
        }}
      >
        <div
          style={{
            width: "100%",
            flex: 1,
            backgroundSize: "cover",
            background: image ? `url(${imageUrl.toString()})` : "#000033",
          }}
        ></div>
        <div
          style={{
            backgroundColor: "white",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            fontSize: 28,
            padding: "20px 48px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "noto-sans",
              fontWeight: 800,
            }}
          >
            {title}
          </p>
          {description ? (
            <p
              style={{
                fontSize: 28,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              {description}
            </p>
          ) : null}
          <p
            style={{
              color: "#666666",
              margin: 0,
              fontSize: 26,
            }}
          >
            {domain}
          </p>
        </div>
      </div>
    ),
    {
      width: 960,
      height: 480,
      fonts: [
        {
          name: "noto-sans",
          style: "normal",
          data: notoBold,
          weight: 800,
        },
        {
          name: "noto-sans",
          style: "normal",
          data: notoSans,
          weight: 500,
        },
      ],
    }
  );
}

export const config = {
  path: "/og/twitter",
};
