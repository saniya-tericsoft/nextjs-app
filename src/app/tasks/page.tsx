interface Task {
  id: number
  title: string
  completed: boolean
  userId: number
}

async function getTasks(): Promise<Task[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', {
      next: { revalidate: 60 } // Cache for 60 seconds
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch tasks')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return []
  }
}

export default async function TasksPage() {
  const tasks = await getTasks()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          ✅ Tasks Page
        </h1>
        
        <div className="max-w-4xl mx-auto">
          {tasks.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <p className="text-lg text-gray-600 dark:text-gray-400 text-center">
                No tasks available. Failed to fetch from JSONPlaceholder.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Your Tasks ({tasks.length})
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Tasks fetched from JSONPlaceholder API
                </p>
              </div>
              
              <div className="grid gap-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Task #{task.id}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            task.completed 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          }`}>
                            {task.completed ? 'Completed' : 'Pending'}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          {task.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          User ID: {task.userId}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            readOnly
                            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                          />
                        </div>
                        <a
                          href={`/tasks/${task.id}`}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-700 dark:text-white dark:hover:bg-indigo-600"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Mock Data Source
                    </h3>
                    <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                      <p>
                        These tasks are fetched from <a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">JSONPlaceholder API</a> for demonstration purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
