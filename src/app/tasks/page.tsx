export default function TasksPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          ✅ Tasks Page
        </h1>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center">
              Manage your tasks here! Create, edit, and track your todo items.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
