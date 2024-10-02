# Bloom Desktop

## Installation

1. `mamba activate bloom-desktop`
2. Follow the instructions in (bloom)[https://gitlab.com/salk-tm/bloom/-/tree/main?ref_type=heads] to setup a local supabase instance to interact with, and add some test data.
3. Create `./.env` in this directory (see `.env.example`).
4. Edit `./.env` with an appropriate database file location.
5. Create `$HOME/.bloom/desktop-config.yaml` (see `desktop-config.yaml.example`).
    - References test images located at `test\sample_scan`.
    - Use the same environment variables as in https://gitlab.com/salk-tm/bloom/-/blob/main/web/env.dev to configure bloom-desktop to work with your local supabase instance.
6. Edit `$HOME/.bloom/desktop-config.yaml` with the correct database file location and other values.
7. Run `npm install`.
    - Make sure you are in `app` directory. 
    - Build tools required for this step:
         - https://visualstudio.microsoft.com/ C++ for Desktop Development on Windows
         - XCode for Mac
         - `build-essential` for Linux
    - Use `npm cache clean` to cleanup
8. Run `npm run client:generate` to generate Typescript client for the new schema (`app\prisma\schema.prisma`)
9. Run `npm run db:deploy` to create the database and apply the migrations.

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


## Troubleshooting

Command to run fake stream independently of the GUI:

```bash
python pylon\pylon_stream_forever_fake.py "{\"num_frames\": 72, \"exposure_time\": 10000, \"gain\": 100, \"brightness\": 0, \"contrast\": 0, \"gamma\": 1, \"seconds_per_rot\": 7, \"camera_ip_address\": \"10.0.0.23\"}"
```