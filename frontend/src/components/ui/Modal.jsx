import { X } from 'lucide-react';
import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div 
        className="fixed inset-0 bg-[#0B0E14]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-[#1A1F26] border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h3 className="text-xl font-black text-white tracking-tight">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
