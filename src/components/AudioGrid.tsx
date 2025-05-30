import { useAudio } from "../../context/AudioContext";


export default function AudioGrid() {
  const { tracks, play, currentTrack, isPlaying, togglePlayPause } = useAudio();

  if (!tracks || tracks.length === 0) {
    return (
      <div style={{ padding: "1rem", color: "#9ca3af" }}>
        No audio tracks available
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1rem",
      }}
    >
      {tracks.map((track, i) => {
        const isCurrent = currentTrack?.id === track.id;
        const isTrackPlaying = isCurrent && isPlaying;

        const handleToggle = () => {
          if (isTrackPlaying) {
            togglePlayPause();
          } else {
            play(i);
          }
        };

        return (
          <div
            key={track.id}
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              padding: "1rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.75rem",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
              backgroundColor: isTrackPlaying ? "#10b981" : "#f9fafb",
              color: isTrackPlaying ? "#ffffff" : "#111827",
              fontWeight: 500,
              transition: "background-color 0.2s ease-in-out",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "default",
            }}
          >
            <span>🎵 {track.name}</span>
            <button
              onClick={handleToggle}
              style={{
                background: "none",
                border: "none",
                fontSize: "1.25rem",
                cursor: "pointer",
                color: isTrackPlaying ? "#ffffff" : "#111827",
              }}
            >
              {isTrackPlaying ? "⏸" : "▶️"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
