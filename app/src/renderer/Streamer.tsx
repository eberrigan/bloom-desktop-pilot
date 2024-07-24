import { useCallback, useEffect, useState } from "react";

const ipcRenderer = window.electron.ipcRenderer;

const startStreaming = window.electron.streamer.startStreaming;
const stopStreaming = window.electron.streamer.stopStreaming;

export function Streamer() {
  const [base64img, setBase64img] = useState("");

  const handleImage = useCallback((img: string) => {
    console.log("image captured: ", img.slice(0, 20), "...");
    // console.log("image captured", base64img);
    setBase64img(img);
  }, []);

  useEffect(() => {
    startStreaming();
    return () => {
      stopStreaming();
    };
  }, []);

  useEffect(() => {
    return ipcRenderer.on("streamer:image-captured", handleImage);
  }, [handleImage]);

  return (
    <div className="flex-grow">
      {base64img && (
        <img src={base64img} alt="streamed image" className="max-h-[300px]" />
      )}
    </div>
  );
}
