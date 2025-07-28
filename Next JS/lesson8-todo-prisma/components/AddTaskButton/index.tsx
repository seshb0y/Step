'use client';
import { useState } from 'react';
import CreateModal from '@/components/CreateModal';

const AddTaskButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="text-center mb-12">
        <button 
          onClick={openModal}
          className="group relative px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg rounded-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 border border-cyan-400/30 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center">
            <svg className="w-6 h-6 mr-3 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="tracking-wider">ADD NEW TASK</span>
          </div>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-black/90 backdrop-blur-lg rounded-2xl border border-cyan-400/30 shadow-2xl p-8 max-w-md w-full transform transition-all">
            <CreateModal onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default AddTaskButton; 