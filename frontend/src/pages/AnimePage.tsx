import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getEpisodes, getProviders } from '../api';
import { Episode, Provider } from '../types';
import { generateTransitionNames } from '../utils';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import NoResults from '../components/NoResults';
import ProviderModal from '../components/ProviderModal';
import VideoPlayer from '../components/VideoPlayer';

const AnimePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('slug');
  const title = searchParams.get('title');
  const image = searchParams.get('image');

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(false);
  const [episodesError, setEpisodesError] = useState<string | null>(null);

  const [providers, setProviders] = useState<Provider[] | null>(null);
  const [isLoadingProviders, setIsLoadingProviders] = useState(false);
  const [providersError, setProvidersError] = useState<string | null>(null);
  const [providerModalOpen, setProviderModalOpen] = useState(false);
  const [currentEpisodeId, setCurrentEpisodeId] = useState<string>('');

  const [videoPlayerOpen, setVideoPlayerOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');

  // Parse and decode parameters
  const decodedSlug = slug ? decodeURIComponent(slug) : '';
  const decodedTitle = title ? decodeURIComponent(title) : 'Detalles del Anime';
  const decodedImage = image ? decodeURIComponent(image) : '/placeholder.png';

  // Generate transition names for animations
  const transitionNames = decodedSlug ? generateTransitionNames(decodedSlug) : {
    card: '',
    image: '',
    title: ''
  };

  // Fetch episodes when slug changes
  useEffect(() => {
    if (!decodedSlug) return;

    const fetchEpisodes = async () => {
      setIsLoadingEpisodes(true);
      setEpisodesError(null);

      try {
        const data = await getEpisodes(decodedSlug);
        setEpisodes(data);
      } catch (err) {
        setEpisodesError('Error al cargar los episodios.');
        console.error(err);
      } finally {
        setIsLoadingEpisodes(false);
      }
    };

    fetchEpisodes();
  }, [decodedSlug]);

  // Update document title
  useEffect(() => {
    document.title = decodedTitle;
  }, [decodedTitle]);

  const handleEpisodeClick = async (episodeId: string) => {
    setCurrentEpisodeId(episodeId);
    setProviderModalOpen(true);
    setProvidersError(null);
    setIsLoadingProviders(true);
    setProviders(null);

    try {
      const data = await getProviders(decodedSlug, episodeId);
      setProviders(data);
    } catch (err) {
      setProvidersError('Error al cargar proveedores.');
      console.error(err);
    } finally {
      setIsLoadingProviders(false);
    }
  };

  const handleProviderSelect = (url: string, title: string) => {
    setVideoUrl(url);
    setVideoTitle(title);
    setProviderModalOpen(false);
    setVideoPlayerOpen(true);
  };

  const closeProviderModal = () => {
    setProviderModalOpen(false);
  };

  const closeVideoPlayer = () => {
    setVideoPlayerOpen(false);
    setVideoUrl('');
  };

  // If no slug is provided, show an error message
  if (!decodedSlug) {
    return (
      <div className="container-custom py-8">
        <Link to="/" className="text-primary font-medium hover:underline inline-block mb-6">
          ← Volver a la búsqueda
        </Link>
        <div className="bg-white rounded-card p-8 shadow-card">
          <h1>Error: Anime no especificado</h1>
          <ErrorMessage message="Falta información para cargar el anime. Vuelve a la búsqueda." />
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom max-w-4xl py-8">
      <Link to="/" className="text-primary font-medium hover:underline inline-block mb-6">
        ← Volver a la búsqueda
      </Link>

      <div className="bg-white rounded-card p-8 shadow-card mb-8">
        <div 
          className="anime-header flex flex-col md:flex-row items-center gap-6 mb-8"
          style={{ viewTransitionName: transitionNames.card }}
        >
          <img
            id="animeImage"
            src={decodedImage}
            alt={decodedTitle}
            className="w-full max-w-[250px] h-auto rounded-card shadow-md"
            style={{ 
              aspectRatio: '262.25 / 373.19',
              objectFit: 'cover',
              viewTransitionName: transitionNames.image 
            }}
          />
          <h1 
            className="text-3xl m-0 text-center md:text-left"
            style={{ viewTransitionName: transitionNames.title }}
          >
            {decodedTitle}
          </h1>
        </div>

        <section className="episodes-section">
          <h2>Episodios</h2>
          <div className="max-h-[50vh] overflow-y-auto pr-2.5 mb-6">
            {isLoadingEpisodes && <LoadingIndicator message="Cargando episodios..." />}
            
            {!isLoadingEpisodes && episodesError && <ErrorMessage message={episodesError} />}
            
            {!isLoadingEpisodes && !episodesError && episodes.length === 0 && (
              <NoResults message="No se encontraron episodios." />
            )}
            
            {!isLoadingEpisodes && !episodesError && episodes.length > 0 && (
              <>
                {episodes.map((episode) => (
                  <button
                    key={episode.nro}
                    type="button"
                    className="episode-button"
                    onClick={() => handleEpisodeClick(episode.nro)}
                  >
                    Episodio {episode.nro}
                  </button>
                ))}
              </>
            )}
          </div>
        </section>
      </div>

      {/* Provider Modal */}
      <ProviderModal
        isOpen={providerModalOpen}
        onClose={closeProviderModal}
        episodeTitle={`Episodio ${currentEpisodeId}`}
        providers={providers}
        isLoading={isLoadingProviders}
        error={providersError}
        onSelectProvider={handleProviderSelect}
      />

      {/* Video Player */}
      <VideoPlayer
        isOpen={videoPlayerOpen}
        onClose={closeVideoPlayer}
        videoUrl={videoUrl}
        videoTitle={videoTitle}
      />
    </div>
  );
};

export default AnimePage;