import { Priority } from '@prisma/client';

interface PriorityButtonProps {
  priority: Priority;
  isActive: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

const PriorityButton = ({ priority, isActive, isDisabled, onClick }: PriorityButtonProps) => {
  const getButtonStyles = () => {
    const baseStyles = 'px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 tracking-wider';
    
    if (isDisabled) {
      return `${baseStyles} cursor-not-allowed opacity-50`;
    }

    switch (priority) {
      case Priority.LOW:
        return isActive 
          ? `${baseStyles} bg-green-500 text-black shadow-lg shadow-green-500/50`
          : `${baseStyles} bg-green-900/60 text-green-400 border border-green-400/30 hover:bg-green-900/80 hover:border-green-400/50`;
      
      case Priority.MEDIUM:
        return isActive 
          ? `${baseStyles} bg-yellow-500 text-black shadow-lg shadow-yellow-500/50`
          : `${baseStyles} bg-yellow-900/60 text-yellow-400 border border-yellow-400/30 hover:bg-yellow-900/80 hover:border-yellow-400/50`;
      
      case Priority.HIGH:
        return isActive 
          ? `${baseStyles} bg-red-500 text-black shadow-lg shadow-red-500/50`
          : `${baseStyles} bg-red-900/60 text-red-400 border border-red-400/30 hover:bg-red-900/80 hover:border-red-400/50`;
      
      default:
        return baseStyles;
    }
  };

  const getDisplayText = () => {
    switch (priority) {
      case Priority.LOW:
        return 'LOW';
      case Priority.MEDIUM:
        return 'MED';
      case Priority.HIGH:
        return 'HIGH';
      default:
        return priority;
    }
  };

  return (
    <button 
      onClick={onClick}
      disabled={isDisabled}
      className={getButtonStyles()}
    >
      {getDisplayText()}
    </button>
  );
};

export default PriorityButton; 