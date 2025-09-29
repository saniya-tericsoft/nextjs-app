-- Tasks Seed Data for LifeSync Next.js App - FIXED VERSION
-- This script inserts sample task data using your actual user ID

-- First, let's get your user ID and insert tasks
WITH user_data AS (
  SELECT id as user_id FROM auth.users LIMIT 1
)
INSERT INTO public.tasks (id, user_id, title, description, status, created_at, updated_at) 
SELECT 
  gen_random_uuid() as id,
  user_id,
  title,
  description,
  status,
  created_at,
  updated_at
FROM user_data
CROSS JOIN (
  VALUES 
    ('Complete project proposal', 'Write and submit the Q1 project proposal by Friday', false, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
    ('Review team feedback', 'Go through all team feedback from the last sprint', true, NOW() - INTERVAL '3 days', NOW() - INTERVAL '1 day'),
    ('Update documentation', 'Update API documentation for the new endpoints', false, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
    ('Schedule team meeting', 'Plan and schedule the weekly team standup', true, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
    ('Learn new technology', 'Study and practice with the latest web development frameworks', false, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
    ('Code review', 'Review pull requests from the development team', true, NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day'),
    ('Database optimization', 'Optimize database queries for better performance', false, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
    ('Client presentation', 'Prepare slides for the quarterly client presentation', true, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
    ('Research competitors', 'Analyze competitor strategies and market trends', false, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
    ('Fix bug in payment system', 'Resolve the payment processing issue reported by users', false, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days')
) AS task_data(title, description, status, created_at, updated_at);

-- Verification queries
SELECT 'Tasks' as table_name, COUNT(*) as record_count FROM public.tasks;
SELECT 'Sample Tasks:' as info;
SELECT id, user_id, title, status, created_at FROM public.tasks LIMIT 5;
