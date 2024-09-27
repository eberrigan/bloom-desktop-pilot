# Bloom Desktop

## Installation

1. Create `./.env` in this directory (see `.env.example`).
2. Edit `./.env` with an appropriate database file location.
3. Create `$HOME/.bloom/desktop-config.yaml` (see `desktop-config.yaml.example`).
4. Edit `$HOME/.bloom/desktop-config.yaml` with the correct database file location and other values.
5. Run `npm install`.
    https://visualstudio.microsoft.com/ C++ build tools required 
6. Run `npm run client:generate` to generate Typescript client for the new schema.
7. Run `npm run db:deploy` to create the database.

## Quickstart

Run `npm run start`.

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
