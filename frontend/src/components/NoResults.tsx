import React from 'react';

interface NoResultsProps {
  message: string;
}

const NoResults: React.FC<NoResultsProps> = ({ message }) => {
  return (
    <div className="col-span-full text-center py-8 text-lg text-gray-500">
      {message}
    </div>
  );
};

export default NoResults;