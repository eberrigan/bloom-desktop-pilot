# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bloom Desktop Pilot is an Electron-React application for interfacing with scientific imaging hardware:
- **Camera Control**: Basler Pylon camera integration for image capture
- **DAQ Integration**: National Instruments DAQ system for hardware control (stepper motor rotation)
- **Data Management**: Local SQLite database via Prisma ORM for storing scan metadata
- **Image Processing**: Python-based image capture and processing pipeline

## Development Commands

### Prerequisites
1. Activate conda environment: `mamba activate bloom-desktop`
2. Ensure you're in the `app` directory for all npm commands

### Common Commands
```bash
# Install dependencies
npm install

# Generate Prisma client (run after schema changes)
npm run client:generate

# Apply database migrations
npm run db:deploy

# Start development server
npm run start

# Lint TypeScript/React code
npm run lint

# Format code with Prettier
npm run format

# Check formatting without changes
npm run format:check

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Create new database migration (after editing schema.prisma)
npm run db:generate
```

### Python Testing Commands
```bash
# Test camera fake stream (from root directory)
python pylon\pylon_stream_forever_fake.py "{\"num_frames\": 72, \"exposure_time\": 10000, \"gain\": 100, \"brightness\": 0, \"contrast\": 0, \"gamma\": 1, \"seconds_per_rot\": 7, \"camera_ip_address\": \"10.0.0.23\"}"

# Test DAQ
python daq\test_daq.py

# Test rotation
python daq\test_rot360.py
```

## Architecture

### Three-Layer Architecture
1. **Electron Main Process** (`app/src/main/`)
   - `main.ts`: Application entry point, window management
   - `scanner.ts`: Coordinates Python scripts for image capture
   - `streamer.ts`: Manages camera preview stream
   - `prismastore.ts`: Database operations via Prisma
   - `imageuploader.ts`: Handles image upload to storage
   - IPC handlers for renderer communication

2. **React Renderer Process** (`app/src/renderer/`)
   - Component-based UI for scan capture, browsing, and settings
   - Key components: `CaptureScan.tsx`, `BrowseScans.tsx`, `CameraSettings.tsx`
   - Uses React Router for navigation
   - Tailwind CSS for styling

3. **Python Hardware Interface** (`pylon/` and `daq/`)
   - `pylon.py`: Real camera control via pypylon
   - `pylon_fake.py`: Mock camera for testing
   - `pylon_stream*.py`: Various streaming implementations
   - `test_daq.py`, `test_rot360.py`: DAQ control scripts
   - Communication via spawn process and JSON arguments

### Database Schema
- **SQLite** database managed by Prisma
- Key models: `Phenotyper`, `Scientist`, `Experiment`, `Scan`, `Image`, `Accessions`
- Relationships track who performed scans, which experiments they belong to
- Schema defined in `app/prisma/schema.prisma`

### Configuration
- Environment variables in `app/.env` (create from `.env.example`)
- Desktop config in `$HOME/.bloom/desktop-config.yaml` (create from `desktop-config.yaml.example`)
- Database URL configured via `BLOOM_DATABASE_URL` environment variable

## Key Development Patterns

### IPC Communication
- Main process exposes handlers via `ipcMain.handle()`
- Renderer calls via `window.electronAPI` (defined in preload.ts)
- All database operations go through main process

### Python Script Integration
- Python scripts spawned as child processes from Node.js
- Arguments passed as JSON strings
- Output captured via stdout/stderr streams
- Scripts return results as JSON or write files directly

### State Management
- Local component state with React hooks
- Database as source of truth for persistent data
- No global state management library (Redux, etc.)

### Error Handling
- Python scripts log to files in test directory
- Electron main process logs to console
- Database errors handled in prismastore.ts

## Important Notes
- Camera IP address configured in Python scripts (10.0.0.23 for production)
- Test images available in `test/sample_scan/` directory
- Build tools required: Visual Studio C++ (Windows), XCode (Mac), build-essential (Linux)
- Always run `npm run client:generate` after database schema changes
- Run `npm run lint` and `npm run format:check` before committing changes

## CI/CD Pipeline
GitHub Actions workflow runs automatically on:
- Pull request creation/updates
- Pushes to main branch

### Workflow Jobs:
1. **Test Job**: Runs on Ubuntu, Windows, and macOS
   - Installs dependencies
   - Runs linting (non-blocking)
   - Runs unit tests
   - Generates coverage report (Ubuntu only)
   
2. **Format Check**: Verifies code formatting with Prettier
   
3. **Build Job**: Attempts to package the application

### Coverage Reporting:
- Coverage reports are generated using Vitest + V8
- Reports uploaded as artifacts
- Coverage comments added to PRs automatically

## ElectricSQL Deprecation Notice
ElectricSQL functionality is currently **NOT IN USE** due to stability issues. The codebase still contains ElectricSQL-related code that should be removed if the decision is made to permanently discontinue its use.

### Files to Remove/Clean if Not Using ElectricSQL:
- `app/src/main/electricstore.ts` - ElectricSQL store implementation
- `app/src/renderer/ElectricStatusBadge.tsx` - UI component for Electric connection status
- `app/src/renderer/ElectricStatusBadge.test.tsx` - Tests for Electric status component
- `app/src/types/electric.types.d.ts` - TypeScript definitions for Electric

### Code to Clean in Existing Files:
- `app/src/main/main.ts` - Remove Electric-related imports and initialization
- `app/src/main/preload.ts` - Remove Electric API exposure
- `app/src/renderer/Layout.tsx` - Remove ElectricStatusBadge component usage
- Multiple renderer components - Remove any Electric sync-related code

### Current State:
- The app uses local SQLite database via Prisma ORM
- No real-time sync functionality is active
- All data operations go through `prismastore.ts`