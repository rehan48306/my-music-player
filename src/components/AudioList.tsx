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
      <table style={{ width: '100%' }}>
        <thead>
          <tr
            style={{
              borderBottom: '1px solid #1f2937', // Tailwind border-gray-800
              textAlign: 'left',
              fontSize: '0.875rem', // text-sm (14px)
              color: '#9ca3af', // text-gray-400
            }}
          >
            <th style={{ paddingBottom: '0.75rem', width: '3rem' }}>#</th>
            <th style={{ paddingBottom: '0.75rem' }}>TITLE</th>
            <th style={{ paddingBottom: '0.75rem' }}>ALBUM</th>
            <th style={{ paddingBottom: '0.75rem', textAlign: 'right' }}>DURATION</th>
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
                  backgroundColor: isTrackPlaying ? '#10b981' : undefined, // green-500
                  color: isTrackPlaying ? '#ffffff' : undefined,
                  fontWeight: isTrackPlaying ? 600 : undefined,
                  cursor: 'pointer',
                  transition:
                    'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
                  borderLeft: isTrackPlaying ? '4px solid #059669' : undefined, // green-600
                }}
                onClick={handleClick}
              >
                <td
                  style={{
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    paddingLeft: '0.5rem',
                    position: 'relative',
                    width: '1.25rem',
                    height: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {!isCurrent && <span>{i + 1}</span>}
                  {isCurrent && !isPlaying && (
                    <Play style={{ width: '1.25rem', height: '1.25rem', color: '#34d399' }} />
                  )}
                  {isCurrent && isPlaying && (
                    <Pause style={{ width: '1.25rem', height: '1.25rem', color: '#34d399' }} />
                  )}
                  {!isCurrent && (
                    <Play style={{ display: 'none', width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
                  )}
                </td>
                <td style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem' }}>{track.name}</td>
                <td style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem', color: '#9ca3af' }}>
                  Album Name
                </td>
                <td
                  style={{
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    paddingRight: '1rem',
                    textAlign: 'right',
                    color: '#9ca3af',
                  }}
                >
                  3:45
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
