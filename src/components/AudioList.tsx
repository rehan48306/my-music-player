import { useAudio } from "../../context/AudioContext";
import { Pause, Play } from "lucide-react";

export default function AudioList() {
  const {
    tracks,
    play,
    currentTrack,
    isPlaying,
    togglePlayPause
  } = useAudio();

  if (!tracks || tracks.length === 0) {
    return (
      <div style={{ padding: "1rem", color: "#9ca3af" }}>
        No audio tracks available
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>
        Playlist
      </h2>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800 text-left text-sm text-gray-400">
            <th className="pb-3 w-12">#</th>
            <th className="pb-3">TITLE</th>
            <th className="pb-3">ALBUM</th>
            <th className="pb-3 text-right">DURATION</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, i) => {
            const isCurrent = currentTrack?.id === track.id;
            const isTrackPlaying = isCurrent && isPlaying;

            const handleClick = () => {
              if (isCurrent) {
                togglePlayPause();
              } else {
                play(i);
              }
            };

            return (
              <tr
                key={track.id}
                style={{
                  backgroundColor: isTrackPlaying ? "#10b981" : undefined,
                  color: isTrackPlaying ? "#ffffff" : undefined,
                  fontWeight: isTrackPlaying ? 600 : undefined,
                  cursor: "pointer",
                  transition: "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
                  borderLeft: isTrackPlaying ? "4px solid #059669" : undefined,
                }}
                onClick={handleClick}
              >
                <td className="py-3 pl-2">
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    {!isCurrent && (
                      <span className="group-hover:hidden">{i + 1}</span>
                    )}
                    {isCurrent && !isPlaying && (
                      <Play className="w-5 h-5 text-green-400" />
                    )}
                    {isCurrent && isPlaying && (
                      <Pause className="w-5 h-5 text-green-400" />
                    )}
                    {!isCurrent && (
                      <Play className="hidden group-hover:block w-5 h-5 text-white" />
                    )}
                  </div>
                </td>
                <td className="py-3">{track.name}</td>
                <td className="py-3 text-gray-400">Album Name</td>
                <td className="py-3 text-right pr-4 text-gray-400">3:45</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
