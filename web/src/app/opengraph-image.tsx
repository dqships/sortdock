import { ImageResponse } from "next/og";

import { readBrandIconDataUrl } from "~/lib/site/readBrandIconDataUrl";

export const alt =
  "SortDock sorts downloads on Mac and Windows by file type or filename";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const iconDataUrl = await readBrandIconDataUrl();

  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#edf5ff",
        color: "#142033",
        display: "flex",
        height: "100%",
        justifyContent: "space-between",
        padding: "76px 84px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: 720 }}>
        <span style={{ fontSize: 34, fontWeight: 700 }}>SortDock</span>
        <strong
          style={{
            fontFamily: "serif",
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 0.98,
            marginTop: 28,
          }}
        >
          Sort downloads by type or filename.
        </strong>
      </div>

      {/* next/image is not supported inside ImageResponse. */}
      <img
        alt=""
        height={284}
        src={iconDataUrl}
        style={{ borderRadius: 52 }}
        width={284}
      />
    </div>,
    size,
  );
}
