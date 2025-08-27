# Script Folder Documentation

This folder contains utility scripts that are not part of the main application runtime but are used for data management and migration tasks.

## Scripts

### upload_metadata.ts

**Purpose:** A data migration/sync script that uploads local scan metadata to the Supabase cloud database.

**What it does:**
- Reads scan data from the local Prisma database
- Creates or finds phenotyper records in Supabase
- Creates or finds scientist records in Supabase  
- Creates camera settings records in Supabase
- Updates scan records with the appropriate foreign key references

**When to use:**
- Initial migration of existing local data to Supabase
- Bulk upload of scan metadata after offline scanning sessions
- Debugging sync issues between local and cloud databases
- Re-syncing data after database issues

**Prerequisites:**
- Valid Bloom Desktop configuration file at `~/.bloom/desktop-config.yaml` with:
  - `local_db_path`: Path to local SQLite database
  - `bloom_api_url`: Supabase project URL
  - `bloom_anon_key`: Supabase anonymous key  
  - `bloom_scanner_username`: Scanner user email
  - `bloom_scanner_password`: Scanner user password

**How to run:**
```bash
# From the app directory
npx ts-node script/upload_metadata.ts
```

**Important notes:**
- This script modifies data in the cloud database - use with caution
- Always backup your data before running migration scripts
- The script will skip scans that don't have corresponding plant records in Supabase
- Errors for individual scans won't stop the entire sync process

### upload_metadata.js

**Purpose:** Compiled JavaScript version of upload_metadata.ts

**Note:** This file can be safely deleted as it's just the compiled output. It can be regenerated if needed by running:
```bash
npx tsc script/upload_metadata.ts
```

## Adding New Scripts

When adding new utility scripts to this folder:

1. Write scripts in TypeScript (.ts) for type safety
2. Place them in this `script/` folder
3. Update this README with:
   - Script purpose and description
   - When to use it
   - Prerequisites
   - How to run it
   - Any important warnings or notes
4. Do NOT include utility scripts in the main application build (they should not be in `src/` directory)
5. Consider adding the compiled .js files to `.gitignore` if they're not needed in the repository

## Best Practices

- Always test scripts on a development database first
- Add console logging for progress tracking
- Handle errors gracefully - don't let one failed record stop the entire process
- Document any environment variables or configuration requirements
- Consider adding a `--dry-run` flag for testing without making changes