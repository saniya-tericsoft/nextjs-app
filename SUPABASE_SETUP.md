# Supabase Database Setup for LifeSync

This document provides instructions for setting up the Supabase database schema for your LifeSync Next.js application.

## Database Schema Overview

The schema includes three main tables:

1. **profiles** - User profile information
2. **tasks** - User tasks and todos
3. **recipes** - User recipes with ingredients and instructions

## Setup Instructions

### 1. Run the SQL Schema

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Execute the SQL script

### 2. Verify Tables Created

After running the schema, you should see these tables in your Supabase dashboard:
- `public.profiles`
- `public.tasks` 
- `public.recipes`

### 3. Test Row Level Security

The schema includes comprehensive RLS policies that ensure:
- Users can only access their own data
- All CRUD operations are properly secured
- No cross-user data access is possible

## Table Structures

### Profiles Table
```sql
- id (UUID, Primary Key, References auth.users.id)
- username (TEXT, Unique, Not Null)
- created_at (TIMESTAMP WITH TIME ZONE, Default NOW())
```

### Tasks Table
```sql
- id (UUID, Primary Key, Default gen_random_uuid())
- user_id (UUID, References auth.users.id, Not Null)
- title (TEXT, Not Null)
- description (TEXT, Nullable)
- status (BOOLEAN, Default FALSE)
- created_at (TIMESTAMP WITH TIME ZONE, Default NOW())
- updated_at (TIMESTAMP WITH TIME ZONE, Default NOW())
```

### Recipes Table
```sql
- id (UUID, Primary Key, Default gen_random_uuid())
- user_id (UUID, References auth.users.id, Not Null)
- title (TEXT, Not Null)
- ingredients (JSONB, Default '[]')
- instructions (TEXT, Nullable)
- created_at (TIMESTAMP WITH TIME ZONE, Default NOW())
- updated_at (TIMESTAMP WITH TIME ZONE, Default NOW())
```

## Row Level Security (RLS) Policies

All tables have RLS enabled with the following policies:

### Profiles
- Users can INSERT their own profile
- Users can SELECT their own profile
- Users can UPDATE their own profile
- Users can DELETE their own profile

### Tasks
- Users can INSERT tasks where user_id = auth.uid()
- Users can SELECT tasks where user_id = auth.uid()
- Users can UPDATE tasks where user_id = auth.uid()
- Users can DELETE tasks where user_id = auth.uid()

### Recipes
- Users can INSERT recipes where user_id = auth.uid()
- Users can SELECT recipes where user_id = auth.uid()
- Users can UPDATE recipes where user_id = auth.uid()
- Users can DELETE recipes where user_id = auth.uid()

## Automatic Profile Creation

The schema includes a trigger that automatically creates a profile when a new user signs up:

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', NEW.email));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## TypeScript Integration

The `src/types/supabase.ts` file contains TypeScript types that match your database schema. Use these types in your Next.js application for type safety.

### Example Usage

```typescript
import { createClient } from '@/utils/supabase/server'
import { Task, TaskInsert, Recipe, RecipeInsert } from '@/types/supabase'

// Create a new task
const newTask: TaskInsert = {
  user_id: userId,
  title: 'Complete project',
  description: 'Finish the LifeSync app',
  status: false
}

// Create a new recipe
const newRecipe: RecipeInsert = {
  user_id: userId,
  title: 'Chocolate Cake',
  ingredients: [
    { name: 'Flour', amount: '2', unit: 'cups' },
    { name: 'Sugar', amount: '1', unit: 'cup' }
  ],
  instructions: 'Mix ingredients and bake at 350°F for 30 minutes'
}
```

## Security Features

1. **Row Level Security**: All tables have RLS enabled
2. **User Isolation**: Users can only access their own data
3. **Automatic Profile Creation**: Profiles are created automatically on signup
4. **Proper Indexing**: Indexes are created for optimal query performance
5. **Updated Timestamps**: Automatic updated_at triggers for tasks and recipes

## Testing the Setup

After running the schema, test the setup by:

1. Creating a new user account
2. Verifying a profile is automatically created
3. Testing CRUD operations on tasks and recipes
4. Confirming that users cannot access other users' data

## Next Steps

1. Update your existing Supabase client code to use the new types
2. Create API routes or server actions for CRUD operations
3. Update your UI components to work with the new schema
4. Test all functionality to ensure RLS is working correctly

## Troubleshooting

If you encounter issues:

1. Check that all tables were created successfully
2. Verify RLS policies are enabled on all tables
3. Test with a new user account to ensure automatic profile creation
4. Check the Supabase logs for any policy violations
