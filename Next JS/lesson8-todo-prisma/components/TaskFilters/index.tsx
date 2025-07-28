'use client';
import { Priority } from '@prisma/client';
import { useState } from 'react';

interface TaskFiltersProps {
  onFiltersChange: (filters: { showCompleted: boolean; priority: Priority | 'ALL' }) => void;
  isLoading?: boolean;
  taskCount: number;
}

const TaskFilters = ({ onFiltersChange, isLoading, taskCount }: TaskFiltersProps) => {
  const [showCompleted, setShowCompleted] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'ALL'>('ALL');

  const handleShowCompletedChange = (checked: boolean) => {
    setShowCompleted(checked);
    onFiltersChange({ showCompleted: checked, priority: priorityFilter });
  };

  const handlePriorityChange = (priority: Priority | 'ALL') => {
    setPriorityFilter(priority);
    onFiltersChange({ showCompleted, priority });
  };

  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-cyan-400/20 shadow-2xl p-8 mb-8">
      <h3 className="text-2xl font-bold text-cyan-400 mb-6 tracking-wider">FILTERS</h3>
      <div className="flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={(e) => handleShowCompletedChange(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-6 h-6 border-2 rounded transition-all duration-300 ${
                showCompleted 
                  ? 'border-cyan-400 bg-cyan-400' 
                  : 'border-gray-400 group-hover:border-cyan-400'
              }`}>
                {showCompleted && (
                  <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-cyan-300 font-medium tracking-wider">SHOW COMPLETED TASKS</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-cyan-300 font-medium tracking-wider">PRIORITY:</span>
          <select
            value={priorityFilter}
            onChange={(e) => handlePriorityChange(e.target.value as Priority | 'ALL')}
            className="px-4 py-2 bg-black/60 border border-cyan-400/30 rounded-lg text-cyan-300 font-medium focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
          >
            <option value="ALL" className="bg-black text-cyan-300">ALL PRIORITIES</option>
            <option value="LOW" className="bg-black text-green-400">🟢 LOW</option>
            <option value="MEDIUM" className="bg-black text-yellow-400">🟡 MEDIUM</option>
            <option value="HIGH" className="bg-black text-red-400">🔴 HIGH</option>
          </select>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-cyan-300 font-medium tracking-wider">LOADING...</span>
            </div>
          )}
          <span className="text-cyan-300 font-medium tracking-wider">
            {taskCount} TASKS
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters; 