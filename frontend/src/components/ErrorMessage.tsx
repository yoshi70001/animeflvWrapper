import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="col-span-full text-center py-8 text-lg font-medium text-red-600">
      {message}
    </div>
  );
};

export default ErrorMessage;