import { useDropzone } from "react-dropzone";
import { useAudio } from "../../context/AudioContext";


export default function AudioUploader() {
  const { setTracks } = useAudio();

  const onDrop = (acceptedFiles: File[]) => {
    const audioFiles = acceptedFiles.filter(file => file.type.startsWith("audio/"));
    const newTracks = audioFiles.map((file, index) => ({
      id: `${file.name}-${index}`,
      name: file.name,
      file,
      url: URL.createObjectURL(file),
    }));
    setTracks(prev => [...prev, ...newTracks]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        marginBottom: "20px",
        border: "1px solid #d1d5db",
        padding: "1rem",
        cursor: "pointer",
        backgroundColor: "#f9fafb", 
        borderRadius: "0.375rem", 
        textAlign: "center",
      }}
    >
      <input {...getInputProps()} accept="audio/*" />
      <p style={{ color: "#6b7280"  }}>Drag & drop or click to upload audio files</p>
    </div>

  );
}

