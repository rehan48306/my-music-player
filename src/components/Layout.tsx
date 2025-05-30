import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        color: "white",
        height: "100vh",
        background: "linear-gradient(to bottom, #1f2937, #000000)",
      }}
    >
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div
          style={{
            flex: 1,
            padding: "2rem",
            overflow: "auto",
            background: "linear-gradient(to bottom, #1f2937, #000000)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}