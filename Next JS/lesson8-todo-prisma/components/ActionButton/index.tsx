interface ActionButtonProps {
  type: 'complete' | 'delete';
  isCompleted?: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

const ActionButton = ({ type, isCompleted, isDisabled, onClick }: ActionButtonProps) => {
  const getButtonStyles = () => {
    const baseStyles = 'px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 tracking-wider';
    
    if (isDisabled) {
      return `${baseStyles} cursor-not-allowed opacity-50`;
    }

    if (type === 'complete') {
      return isCompleted 
        ? `${baseStyles} bg-green-500 text-black shadow-lg shadow-green-500/50`
        : `${baseStyles} bg-gray-900/60 text-gray-300 border border-gray-400/30 hover:bg-gray-900/80 hover:border-gray-400/50`;
    }

    if (type === 'delete') {
      return `${baseStyles} bg-red-900/60 text-red-400 border border-red-400/30 hover:bg-red-900/80 hover:border-red-400/50`;
    }

    return baseStyles;
  };

  const getButtonText = () => {
    if (type === 'complete') {
      return isCompleted ? '✓ DONE' : 'COMPLETE';
    }
    if (type === 'delete') {
      return 'DELETE';
    }
    return '';
  };

  return (
    <button 
      onClick={onClick}
      disabled={isDisabled}
      className={getButtonStyles()}
    >
      {getButtonText()}
    </button>
  );
};

export default ActionButton; 