# Bloom Desktop

## Installation

1. `mamba activate bloom-desktop`
2. Create `./.env` in this directory (see `.env.example`).
3. Edit `./.env` with an appropriate database file location.
4. Create `$HOME/.bloom/desktop-config.yaml` (see `desktop-config.yaml.example`).
    - References test images located at `test\sample_scan`.
5. Edit `$HOME/.bloom/desktop-config.yaml` with the correct database file location and other values.
6. Run `npm install`.
    - Make sure you are in `app` directory. 
    - Build tools required for this step:
         - https://visualstudio.microsoft.com/ C++ for Desktop Development on Windows
         - XCode for Mac
         - `build-essential` for Linux
    - Use `npm cache clean` to cleanup
7. Run `npm run client:generate` to generate Typescript client for the new schema (`app\prisma\schema.prisma`)
8. Run `npm run db:deploy` to create the database and apply the migrations.

## Quickstart

Run `npm run start` from `app` directory.

## Modifying the database

1. Edit `prisma/schema.prisma`
2. Run `npm run db:generate` to generate migrations
3. Run `npm run db:deploy` to apply migrations
4. Run `npm run client:generate` to generate Typescript client for the new schema

## Updating the software

If you already have a working installation, here is how you update the software. This assumes that the software updates have been merged into the `main` branch of this Git repository.

1. Open a terminal / prompt and navigate to the respository.
2. Run `git pull`.
3. Run `npm install`.
4. Run `npm run client:generate` to generate Typescript client for the new schema.
5. Run `npm run db:deploy` to apply migrations.
