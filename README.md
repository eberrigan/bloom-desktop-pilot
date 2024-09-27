# Bloom Desktop Pilot

## Introduction
This is a pilot project designed to interface with a camera and DAQ (Data Acquisition System) from an Electron-React application.

## Requirements
This project is divided into three main parts: the Pylon camera interface, the National Instruments DAQ (NI-DAQ) control, and the Electron desktop app.

You'll need to install some Python and Node packages to run these three components.

1. Create the `bloom-desktop` environment with python 3.8 and nodejs: `mamba create --name bloom-desktop python=3.8 nodejs pip`
2. Activate the environment: `mamba activate bloom-desktop`
3. Install pip requirements:
   `pip install -r requirements.txt`

### NI-DAQ Control
For controlling the NI-DAQ, you need to install some additional software from National Instruments.

**LabVIEW Runtime Engine:**
- Install the latest version of LabVIEW RTE 64-bit from [LabVIEW Runtime](https://www.ni.com/en-us/support/downloads/software-products/download.labview-runtime.html#484336). The installation comes with the NI Package Manager, which is required for managing and updating National Instruments software.

**National Instruments DAQmx Driver:**
- Install the latest NI-DAQmx driver from [NI-DAQmx Download](https://www.ni.com/en/support/downloads/drivers/download.ni-daq-mx.html#494676). The driver comes with NI Measurement & Automation Explorer (MAX), which is used to configure NI hardware devices.

### Basler Pylon
To capture images from the camera, you'll need to install additional software from Basler.

**Pylon**
- Install the latest version of Pylon from [Basler](https://www2.baslerweb.com/en/downloads/software-downloads/).
