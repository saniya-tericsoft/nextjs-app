-- Profiles Seed Data for LifeSync Next.js App - FIXED VERSION
-- This script inserts sample profile data using your actual user ID

-- IMPORTANT: Profiles are usually automatically created when users sign up via the trigger
-- This seed data is only needed if you want to manually create profiles for testing

-- First, let's get your user ID and check if profile already exists
WITH user_data AS (
  SELECT id as user_id, email FROM auth.users LIMIT 1
),
existing_profile AS (
  SELECT COUNT(*) as profile_count FROM public.profiles p
  JOIN user_data u ON p.id = u.user_id
)
INSERT INTO public.profiles (id, username, created_at) 
SELECT 
  user_id,
  COALESCE(
    SPLIT_PART(email, '@', 1), 
    'user_' || SUBSTRING(user_id::text, 1, 8)
  ) as username,
  NOW() - INTERVAL '30 days' as created_at
FROM user_data
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles WHERE id = user_data.user_id
);

-- Verification queries
SELECT 'Profiles' as table_name, COUNT(*) as record_count FROM public.profiles;
SELECT 'Sample Profiles:' as info;
SELECT id, username, created_at FROM public.profiles LIMIT 5;

-- Show current user info
SELECT 'Current User Info:' as info;
SELECT id, email FROM auth.users LIMIT 1;
