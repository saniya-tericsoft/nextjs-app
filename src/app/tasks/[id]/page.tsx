import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface TaskPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function TaskPage({ params }: TaskPageProps) {
  const { id } = await params
  const cookieStore = cookies()
  const supabase = await createClient(cookieStore)

  // Fetch the specific task by ID
  const { data: task, error } = await supabase
    .from('todos')
    .select('*')
    .eq('id', id)
    .single()

  // If task not found or error, use mock data
  let displayTask = task
  if (error || !task) {
    // Mock task data for demonstration
    displayTask = {
      id: id,
      text: `Mock Task ${id} - This is a sample task for demonstration purposes`,
      completed: Math.random() > 0.5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: 'mock-user-id'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/tasks"
              className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Tasks
            </Link>
          </div>

          {/* Task Details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-start justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Task Details
              </h1>
              <div className="flex items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    displayTask.completed
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}
                >
                  {displayTask.completed ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>

            {/* Task Content */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Task ID
                </label>
                <p className="text-lg text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded">
                  #{displayTask.id}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Task Description
                </label>
                <p className="text-lg text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border">
                  {displayTask.text}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Created At
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(displayTask.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Updated
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(displayTask.updated_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              {/* Completion Status */}
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <input
                  type="checkbox"
                  checked={displayTask.completed}
                  readOnly
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="text-gray-900 dark:text-white font-medium">
                  {displayTask.completed ? 'This task has been completed' : 'This task is pending completion'}
                </span>
              </div>

              {/* Mock Data Indicator */}
              {!task && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Mock Data
                      </h3>
                      <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                        <p>
                          This is demonstration data. No task with ID <span className="font-mono font-semibold">{id}</span> exists in the database.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex space-x-4">
              <Link
                href="/tasks"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center transition-colors duration-200"
              >
                View All Tasks
              </Link>
              <Link
                href="/dashboard"
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium text-center transition-colors duration-200"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
