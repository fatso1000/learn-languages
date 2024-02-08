#!/bin/sh
# -e Exit immediately when a command returns a non-zero status.
# -x Print commands before they are executed
set -ex
# Seeding command
PGPASSWORD=6nkurqLU0xOe psql -U postgres -d elearning -f prisma/seed.sql