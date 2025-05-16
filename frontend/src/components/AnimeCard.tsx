import React from 'react';
import { Link } from 'react-router-dom';
import { Anime } from '../types';
import { generateTransitionNames } from '../utils';

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const { slug, title, image, banner } = anime;
  const imageUrl = banner || image || '/placeholder.png';
  const transitionNames = generateTransitionNames(slug);
  
  // Prepare URL params for the detail page
  const encodedSlug = encodeURIComponent(slug);
  const encodedTitle = encodeURIComponent(title);
  const encodedImage = encodeURIComponent(imageUrl);
  const to = `/anime?slug=${encodedSlug}&title=${encodedTitle}&image=${encodedImage}`;

  return (
    <Link
      to={to}
      className="anime-card block"
      style={{
        viewTransitionName: transitionNames.card,
      }}
    >
      <img
        loading="lazy"
        style={{
          contentVisibility: 'auto',
          aspectRatio: '262.25 / 373.19',
          viewTransitionName: transitionNames.image,
        }}
        className="w-full object-cover min-h-[370px] bg-gray-200"
        src={imageUrl}
        alt={title}
      />
      <div className="p-4">
        <h3 
          className="m-0 text-lg"
          style={{
            viewTransitionName: transitionNames.title,
          }}
        >
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default AnimeCard;