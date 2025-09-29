-- Migration to add completion_date field to tasks table
-- Run this in your Supabase SQL editor

-- Add completion_date column to tasks table
ALTER TABLE public.tasks 
ADD COLUMN IF NOT EXISTS completion_date TIMESTAMP WITH TIME ZONE;

-- Add index for better performance on completion_date queries
CREATE INDEX IF NOT EXISTS idx_tasks_completion_date ON public.tasks(completion_date);

-- Update the updated_at trigger to handle the new column
-- (The existing trigger should already handle this automatically)
