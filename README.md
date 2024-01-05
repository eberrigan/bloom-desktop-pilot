# Bloom Desktop Pilot

## Introduction
This is a pilot project designed to interface with a camera and DAQ (Data Acquisition System) from an Electron-React application.

## Requirements
This project is divided into two main parts: the pylon camera interface and the National Instruments DAQ (NI-DAQ) control.

### Pylon Camera Interface
To set up the environment for the pylon camera portion of the application, you need to install the necessary Python packages.

Install the requirements using pip: `pip install -r requirements.txt`

### NI-DAQ Control
For controlling the NI-DAQ, you need to install some additional software from National Instruments.

**LabVIEW Runtime Engine:**
- Install the latest version of LabVIEW RTE 64-bit from [LabVIEW Runtime](https://www.ni.com/en-us/support/downloads/software-products/download.labview-runtime.html#484336). The installation comes with the NI Package Manager, which is required for managing and updating National Instruments software.

**National Instruments DAQmx Driver:**
- Install the latest NI-DAQmx driver from [NI-DAQmx Download](https://www.ni.com/en/support/downloads/drivers/download.ni-daq-mx.html#494676). The driver comes with NI Measurement & Automation Explorer (MAX), which is used to configure NI hardware devices.
