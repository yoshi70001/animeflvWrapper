import { Anime, Episode, Provider } from './types';

const BASE_URL = '';  // No base URL needed if using relative paths to the same origin

export async function searchAnimes(searchTerm: string): Promise<Anime[]> {
  try {
    const response = await fetch(`/query/${encodeURIComponent(searchTerm)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
}

export async function getEpisodes(animeSlug: string): Promise<Episode[]> {
  try {
    const response = await fetch(`/anime/episode/${animeSlug}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching episodes:', error);
    throw error;
  }
}

export async function getProviders(animeSlug: string, episodeId: string): Promise<Provider[]> {
  try {
    const response = await fetch(`/video/${animeSlug}/${episodeId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching providers:', error);
    throw error;
  }
}