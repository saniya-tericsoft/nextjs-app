import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { Database } from '@/types/database'

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

  // Color schemes for different task cards
  const getCardColors = (index: number, isCompleted: boolean) => {
    const colorSchemes = [
      {
        bg: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/30',
        border: 'border-blue-200 dark:border-blue-700',
        accent: 'text-blue-600 dark:text-blue-400',
        badge: isCompleted ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      },
      {
        bg: 'bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/30',
        border: 'border-purple-200 dark:border-purple-700',
        accent: 'text-purple-600 dark:text-purple-400',
        badge: isCompleted ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      },
      {
        bg: 'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/30',
        border: 'border-green-200 dark:border-green-700',
        accent: 'text-green-600 dark:text-green-400',
        badge: isCompleted ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      },
      {
        bg: 'bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/30',
        border: 'border-orange-200 dark:border-orange-700',
        accent: 'text-orange-600 dark:text-orange-400',
        badge: isCompleted ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
      },
      {
        bg: 'bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/30',
        border: 'border-teal-200 dark:border-teal-700',
        accent: 'text-teal-600 dark:text-teal-400',
        badge: isCompleted ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300'
      }
    ]
    return colorSchemes[index % colorSchemes.length]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            My Tasks
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage your tasks with style and efficiency
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {tasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full mb-6">
                <span className="text-4xl">📝</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                No tasks yet
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Create your first task to get started with your productivity journey!
              </p>
              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                Create First Task
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <span className="text-2xl">📋</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{tasks.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                      <span className="text-2xl">✅</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {tasks.filter(task => task.status).length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                      <span className="text-2xl">⏳</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {tasks.filter(task => !task.status).length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tasks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task, index) => {
                  const colors = getCardColors(index, task.status)
                  return (
                    <div
                      key={task.id}
                      className={`${colors.bg} ${colors.border} rounded-2xl p-6 shadow-lg border-2 hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
                    >
                      {/* Task Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${colors.accent} bg-current`}></div>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            #{task.id.slice(0, 6)}...
                          </span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                          {task.status ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                      
                      {/* Task Content */}
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            {task.description}
                          </p>
                        )}
                      </div>
                      
                      {/* Task Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={task.status}
                              readOnly
                              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                            />
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(task.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <a
                          href={`/tasks/${task.id}`}
                          className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                        >
                          View →
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
              
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
