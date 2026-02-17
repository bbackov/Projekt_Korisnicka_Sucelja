-- WARNING:
-- This script permanently deletes all events and registrations.
-- Use in Supabase SQL Editor when you want a clean start.

begin;

truncate table public.registrations restart identity;
truncate table public.events restart identity cascade;

commit;

-- Optional next step:
-- Run scripts/003_create_events_and_registrations.sql again
-- if you want starter events back in the database.
