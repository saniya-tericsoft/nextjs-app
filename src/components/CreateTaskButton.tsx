'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import CreateTaskModal from './CreateTaskModal'

interface CreateTaskButtonProps {
  onTaskCreated?: () => void
}

export default function CreateTaskButton({ onTaskCreated }: CreateTaskButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleTaskCreated = () => {
    onTaskCreated?.()
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group z-40"
        aria-label="Create new task"
      >
        <Plus className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </button>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={handleTaskCreated}
      />
    </>
  )
}
