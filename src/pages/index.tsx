"use client";

import { useState } from "react";

import AudioUploader from "../components/AudioUploader";
import ToggleView from "../components/ToggleView";
import AudioList from "../components/AudioList";
import AudioGrid from "../components/AudioGrid";
import { AudioProvider } from "../../context/AudioContext";


export default function HomePage() {
  const [view, setView] = useState<"list" | "grid">("list");

  return (
    <AudioProvider>
      <main
        style={{
          maxWidth: "56rem",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "1.5rem",
        }}
      >
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "700",
            marginBottom: "1rem",
          }}
        >
          My Music Player 🎵
        </h1>

        <AudioUploader />

        <ToggleView view={view} setView={setView} />

        {view === "list" ? <AudioList /> : <AudioGrid />}

      </main>
    </AudioProvider>
  );
}
