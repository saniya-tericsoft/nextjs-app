import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { Database } from '@/types/database'
import TasksPageClient from '@/components/TasksPageClient'

type Task = Database['public']['Tables']['tasks']['Row']

async function getTasks(): Promise<Task[]> {
  try {
    const cookieStore = cookies()
    const supabase = await createClient(cookieStore)
    
    const { data: tasks, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching tasks:', error)
      return []
    }
    
    return tasks || []
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return []
  }
}

export default async function TasksPage() {
  const tasks = await getTasks()

  return <TasksPageClient initialTasks={tasks} />
}


