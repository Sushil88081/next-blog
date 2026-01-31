-- Migration script to make email column nullable
-- Run this in your Supabase SQL editor if the table already exists

ALTER TABLE comments ALTER COLUMN email DROP NOT NULL;

