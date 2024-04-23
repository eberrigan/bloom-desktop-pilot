import path from "path";
import { v4 as uuidv4 } from "uuid";
import { ChildProcessWithoutNullStreams, spawn } from "node:child_process";
import fs from "fs";
import { defaultCameraSettings } from "./scanner";
import { createInterface } from "node:readline";

import { Electric_cyl_scans } from "../generated/client";

class Streamer {
  public onCaptureImage: (base64img: string) => void = (base64img) => {};

  private python: string;
  private stream_scans_py: string;
  private cameraIpAddress: string;
  private cameraSettings: CameraSettings = defaultCameraSettings();
  private subprocess: ChildProcessWithoutNullStreams | null = null;

  constructor(
    config: ScannerConfig,
    onCaptureImage: (base64img: string) => void = () => {}
  ) {
    this.onCaptureImage = onCaptureImage;
    this.python = config.python;
    this.stream_scans_py = config.stream_scans_py;
    this.cameraIpAddress = config.camera_ip_address;
  }

  startStreaming = async () => {
    console.log("Starting streamer");

    this.subprocess = spawn(this.python, [
      this.stream_scans_py,
      JSON.stringify({
        ...this.cameraSettings,
        camera_ip_address: this.cameraIpAddress,
      }),
    ]);

    const rl = createInterface({
      input: this.subprocess.stdout,
      crlfDelay: Infinity, // Support CR and LF as line breaks
    });

    // Event listener for each line of output
    rl.on("line", (line) => {
      console.log(`Received line of length: ${line.length}`);
      if (line.slice(0, 5) === "IMAGE") {
        console.log("data matches IMAGE");
        const base64img = line.slice(6).trim();
        console.log(`Received image: ${base64img.slice(0, 20)}...`);
        this.onCaptureImage(base64img);
      }
    });

    this.subprocess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      // this.onScanError(data.toString());
    });

    this.subprocess.on("close", (code) => {
      console.log(`Child process exited with code ${code}`);
      rl.close(); // Don't forget to close the readline interface
    });
  };

  stopStreaming = () => {
    console.log("Stopping streamer");
    if (this.subprocess) {
      this.subprocess.kill();
      this.subprocess = null;
    }
  };

  getCameraSettings = () => {
    return this.cameraSettings;
  };

  setCameraSettings = (settings: CameraSettings) => {
    this.cameraSettings = settings;
  };
}

function createStreamer(config: ScannerConfig) {
  const scanner = new Streamer(config);
  return scanner;
}

export { createStreamer };
