import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200'
  };

  return (
    <div className={`${bgColors[type]} border rounded-lg shadow-lg p-4 pr-12 
                     animate-slideIn min-w-[300px] max-w-md relative`}>
      <div className="flex items-start space-x-3">
        {icons[type]}
        <p className="text-sm font-medium text-gray-900">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;