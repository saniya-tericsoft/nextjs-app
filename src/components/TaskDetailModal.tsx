'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Database } from '@/types/database'
import { X, Edit3, Save, Calendar, CheckCircle } from 'lucide-react'

type Task = Database['public']['Tables']['tasks']['Row']

interface TaskDetailModalProps {
  isOpen: boolean
  onClose: () => void
  task: Task | null
  onTaskUpdated: () => void
}

export default function TaskDetailModal({ 
  isOpen, 
  onClose, 
  task, 
  onTaskUpdated 
}: TaskDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [editedTask, setEditedTask] = useState({
    title: '',
    description: '',
    completion_date: '',
    status: false
  })

  // Update edited task when task prop changes
  useEffect(() => {
    if (task) {
      setEditedTask({
        title: task.title,
        description: task.description || '',
        completion_date: task.completion_date || '',
        status: task.status
      })
    }
  }, [task])

  const handleSave = async () => {
    if (!task) return

    setIsLoading(true)
    try {
      const supabase = createClient()
      
      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        console.error('Authentication error:', authError)
        alert('You must be logged in to update tasks.')
        return
      }
      
      // Check if task belongs to current user
      if (task.user_id !== user.id) {
        console.error('Task does not belong to current user')
        alert('You can only update your own tasks.')
        return
      }
      
      console.log('Updating task with data:', {
        id: task.id,
        title: editedTask.title,
        description: editedTask.description,
        completion_date: editedTask.completion_date,
        status: editedTask.status
      })
      
      const { error } = await supabase
        .from('tasks')
        .update({
          title: editedTask.title,
          description: editedTask.description || null,
          completion_date: editedTask.completion_date || null,
          status: editedTask.status
        })
        .eq('id', task.id)

      if (error) {
        console.error('Error updating task:', error)
        console.error('Error details:', JSON.stringify(error, null, 2))
        alert(`Failed to update task: ${error.message || 'Unknown error'}`)
        return
      }

      setIsEditing(false)
      onTaskUpdated()
      onClose()
    } catch (error) {
      console.error('Error updating task:', error)
      alert('Failed to update task. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    if (task) {
      setEditedTask({
        title: task.title,
        description: task.description || '',
        completion_date: task.completion_date || '',
        status: task.status
      })
    }
    setIsEditing(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!isOpen || !task) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
              <CheckCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Task Details
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                #{task.id.slice(0, 8)}...
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                title="Edit task"
              >
                <Edit3 className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Task Title
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) => setEditedTask(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter task title..."
              />
            ) : (
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {task.title}
              </p>
            )}
          </div>

          {/* Task Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            {isEditing ? (
              <textarea
                value={editedTask.description}
                onChange={(e) => setEditedTask(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                placeholder="Enter task description..."
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                {task.description || 'No description provided'}
              </p>
            )}
          </div>

          {/* Completion Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Completion Date
            </label>
            {isEditing ? (
              <input
                type="date"
                value={editedTask.completion_date}
                onChange={(e) => setEditedTask(prev => ({ ...prev, completion_date: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                {task.completion_date ? formatDate(task.completion_date) : 'No due date set'}
              </p>
            )}
          </div>

          {/* Task Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={editedTask.status}
                onChange={(e) => setEditedTask(prev => ({ ...prev, status: e.target.checked }))}
                disabled={!isEditing}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 disabled:opacity-50"
              />
              <span className={`text-sm font-medium ${
                editedTask.status 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-orange-600 dark:text-orange-400'
              }`}>
                {editedTask.status ? 'Completed' : 'Pending'}
              </span>
            </div>
          </div>

          {/* Task Metadata */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Task Information
            </h3>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p><span className="font-medium">Created:</span> {formatDate(task.created_at)}</p>
              <p><span className="font-medium">Last Updated:</span> {formatDate(task.updated_at)}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        {isEditing && (
          <div className="flex space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading || !editedTask.title.trim()}
              className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
