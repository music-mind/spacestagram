import React, { useState, useEffect } from 'react';
import "./card.css";
import {Image} from './App'
import {MediaCard} from '@shopify/polaris';

export interface CardImage {
  image: Image;
};

export function Card(props : CardImage) {
  const [liked, setLiked] = useState<boolean>(false);
  const image = props.image;
  let symbol = liked ? '❤️' : '🤍';

  useEffect(() => {
    // Check localStorage
    if (window.localStorage.getItem('likedImages')) {
      const arr = JSON.parse(window.localStorage.getItem('likedImages')  || '{}');
      const likedImages = new Set(arr);
      if (likedImages.has(image.url)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [liked, image.url])

  const handleLike = () => {
    let arr = [];
    if (window.localStorage.getItem('likedImages')) {
      arr = JSON.parse(window.localStorage.getItem('likedImages')  || '{}');
    }
    let likedImages = new Set(arr);
    if (liked) {
      likedImages.delete(image.url);
    } else {
      likedImages.add(image.url);
    }
    arr = Array.from(likedImages);
    window.localStorage.setItem('likedImages', JSON.stringify(arr));
    setLiked(!liked);
  }

  return (
   <div className="card">
   <MediaCard
    title={image.title}
    primaryAction={{
      content: symbol,
      onAction: handleLike,
    }}
    description={image.explanation}
    portrait={true}
   >
    <img className='cardImage' alt={image.title} src={image.url} />
    <p className="date">{image.date}</p>
    </MediaCard>
   </div>
  );
}
