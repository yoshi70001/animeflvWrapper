import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';
import { Provider } from '../types';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';
import NoResults from './NoResults';

interface ProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  episodeTitle: string;
  providers: Provider[] | null;
  isLoading: boolean;
  error: string | null;
  onSelectProvider: (url: string, title: string) => void;
}

const ProviderModal: React.FC<ProviderModalProps> = ({
  isOpen,
  onClose,
  episodeTitle,
  providers,
  isLoading,
  error,
  onSelectProvider,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  
  // Focus the close button when the modal opens
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      className={clsx("modal-overlay", isOpen && "show")}
      aria-hidden={!isOpen}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className="modal" 
        role="dialog" 
        aria-modal={true} 
        aria-labelledby="providerModalTitle"
      >
        <h2 id="providerModalTitle">
          {`Proveedores para ${episodeTitle}`}
        </h2>
        <div className="max-h-[50vh] overflow-y-auto mb-6">
          {isLoading && <LoadingIndicator message="Cargando proveedores..." />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && providers?.length === 0 && (
            <NoResults message="No hay proveedores disponibles." />
          )}
          {!isLoading && !error && providers && providers.length > 0 && (
            <>
              {providers.map((provider, index) => (
                <button
                  key={index}
                  type="button"
                  className="episode-button"
                  onClick={() => onSelectProvider(provider.code, provider.title)}
                >
                  {provider.title}
                </button>
              ))}
            </>
          )}
        </div>
        <button 
          type="button" 
          className="close-btn"
          onClick={onClose}
          ref={closeButtonRef}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ProviderModal;