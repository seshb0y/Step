import { addTask } from '@/action/addTask'
import React from 'react'

interface CreateModalProps {
  onClose?: () => void;
}

const CreateModal = ({ onClose }: CreateModalProps) => {
  const handleSubmit = async (formData: FormData) => {
    await addTask(formData);
    onClose?.();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-cyan-400 tracking-wider">ADD NEW TASK</h3>
        <button 
          onClick={onClose}
          className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form action={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="title" className="block text-lg font-bold text-cyan-400 mb-4 tracking-wider">
            TASK TITLE
          </label>
          <input 
            type="text" 
            name="title" 
            id="title"
            placeholder="ENTER TASK TITLE..." 
            className="w-full px-6 py-4 bg-black/60 border-2 border-cyan-400/30 rounded-lg text-cyan-300 font-medium placeholder-cyan-300/50 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 backdrop-blur-sm tracking-wider"
            required
          />
        </div>
        
        <div>
          <label htmlFor="priority" className="block text-lg font-bold text-cyan-400 mb-4 tracking-wider">
            PRIORITY LEVEL
          </label>
          <select 
            name="priority" 
            id="priority" 
            className="w-full px-6 py-4 bg-black/60 border-2 border-cyan-400/30 rounded-lg text-cyan-300 font-medium focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 backdrop-blur-sm tracking-wider"
          >
            <option value="LOW" className="bg-black text-green-400 font-medium">🟢 LOW PRIORITY</option>
            <option value="MEDIUM" className="bg-black text-yellow-400 font-medium">🟡 MEDIUM PRIORITY</option>
            <option value="HIGH" className="bg-black text-red-400 font-medium">🔴 HIGH PRIORITY</option>
          </select>
        </div>
        
        <div className="pt-6">
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold text-lg px-8 py-4 rounded-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 border border-cyan-400/30 tracking-wider"
          >
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              CREATE TASK
            </div>
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateModal