import React, { useState, useEffect, useRef, Suspense  } from 'react';
import {Loader} from './loader'
import {Card} from './card'
import './App.css';

import {AppProvider, Icon} from '@shopify/polaris';
import "@shopify/polaris/dist/styles.css";
import en from '@shopify/polaris/locales/en.json';
import {
  LinkMinor
} from '@shopify/polaris-icons';

export interface Image {
  title: string;
  explanation: string;
  date: string;
  url: string;
};

export interface ImageList {
  images: Image[];
};

function App() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    async function getImages() {
      try {
        // Get image urls from API
        const res = await fetch('https://api.nasa.gov/planetary/apod' + '?' + new URLSearchParams({
          api_key: (process.env.REACT_APP_NASA_KEY as string),
          count: '5',
        }));
        const data = await res.json();

        setImages(data);
      }
      catch(e) {
        alert('Could not get images!');
      }
    }

    getImages();
  }, []);

  return (
    <AppProvider i18n={en}>
      <div className="App">
        <header className="header">
          <h1>Spacestagram</h1>
        </header>
        <main>
          <p>Brought to you by NASA's Astronomy Picture of the Day (APOD) API.</p>
          <a href="https://github.com/music-mind/spacestagram" target="_blank" rel="noreferrer" className="source">
            <h3>Source</h3>
            <Icon
              source={LinkMinor}
              color="base"
            />
          </a>
          <Suspense fallback={<Loader />}>
            <div className="imageList">
              <ImageList images={images} />
            </div>
          </Suspense>
        </main>
      </div>
    </AppProvider>
  );
}

function ImageList(props : ImageList) {
  const images = props.images;
  const cards = images.map((image) =>
    <Suspense key={image.title} fallback={<Loader />}>
      <Card image={image}/>
    </Suspense>
  );
  return (
    <>{cards}</>
  );
}

export default App;
