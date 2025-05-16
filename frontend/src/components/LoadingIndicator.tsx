import React from 'react';

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message = 'Cargando...' }) => {
  return (
    <div className="col-span-full text-center py-8 text-lg text-gray-500">
      {message}
    </div>
  );
};

export default LoadingIndicator;