"use client";
import * as React from "react";
import { img } from "@/lib/image-cache";

type Props = {
  src: string;
  alt?: string;
  style?: React.CSSProperties;
  hideEmpty?: boolean;
};

/** A small, neutral macOS window bezel around a real app capture. */
export function MacWindowFrame({ src, alt = "", style, hideEmpty }: Props) {
  const resolved = img(src);
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "16 / 10",
        overflow: "hidden",
        borderRadius: "2.1%",
        background: "#E8EDF1",
        boxShadow: "0 28px 54px rgba(15, 43, 64, 0.2), 0 4px 12px rgba(15, 43, 64, 0.14)",
        ...style,
      }}
    >
      <div
        aria-hidden
        style={{
          height: "5.4%",
          minHeight: 18,
          display: "flex",
          alignItems: "center",
          padding: "0 2.1%",
          gap: "1.05%",
          background: "linear-gradient(180deg, #F8FAFB 0%, #E8EDF1 100%)",
          borderBottom: "1px solid rgba(29, 53, 69, 0.14)",
        }}
      >
        <span style={{ width: "1.25%", aspectRatio: "1", borderRadius: "50%", background: "#FF5F57" }} />
        <span style={{ width: "1.25%", aspectRatio: "1", borderRadius: "50%", background: "#FEBC2E" }} />
        <span style={{ width: "1.25%", aspectRatio: "1", borderRadius: "50%", background: "#28C840" }} />
        <div style={{ flex: 1 }} />
      </div>
      <div style={{ height: "94.6%", overflow: "hidden", background: "#FFFFFF" }}>
        {resolved ? (
          <img
            src={resolved}
            alt={alt}
            draggable={false}
            style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
          />
        ) : hideEmpty ? null : (
          <div style={{ display: "grid", width: "100%", height: "100%", placeItems: "center", color: "#6B8292", fontSize: "2.2cqw" }}>
            Drop a Mac screenshot here
          </div>
        )}
      </div>
    </div>
  );
}
