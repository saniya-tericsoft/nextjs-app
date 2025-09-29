import { CheckSquare, Utensils, CloudSun, User } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const features = [
    {
      icon: CheckSquare,
      title: 'Tasks',
      description: 'Stay organized with tasks and habits.',
      href: '/tasks'
    },
    {
      icon: Utensils,
      title: 'Recipes',
      description: 'Save and discover delicious recipes.',
      href: '/recipes'
    },
    {
      icon: CloudSun,
      title: 'Weather',
      description: 'Real-time weather updates.',
      href: '/weather'
    },
    {
      icon: User,
      title: 'Profile',
      description: 'Manage your account settings.',
      href: '/profile'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Welcome to LifeSync
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            All your tasks, habits, and plans in one place.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your personal command center for productivity and organization.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <a
                  key={index}
                  href={feature.href}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/50 transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-indigo-200 dark:border-indigo-800">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Get Started
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Choose any feature above to begin organizing your life with LifeSync.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/tasks"
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  <CheckSquare className="h-5 w-5 mr-2" />
                  Start with Tasks
                </Link>
                <a
                  href="/recipes"
                  className="inline-flex items-center px-6 py-3 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 font-medium rounded-lg transition-colors duration-200"
                >
                  <Utensils className="h-5 w-5 mr-2" />
                  Explore Recipes
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
