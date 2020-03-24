import React, { useState, useEffect } from 'react';
import './App.css';
import Unsplash, { toJson } from 'unsplash-js';
import { APIkey } from './config/keys';

const unsplash = new Unsplash({accessKey: APIkey});

function App() {
  const [photos, setPhotos] = useState([]);

  //when App first loads, make an initial request for photos to display
  useEffect(() => {
    async function getInitialPhotos() {
      const response = await unsplash.search.photos("California", 1, 10).then(toJson).then(json => json.results);

    setPhotos(response);
    }

    getInitialPhotos();
  }, [photos]);

  return (
    <div>
      <h3>Unsplash</h3>
      {photos.map(photo =>(
        <img src={photo.urls.regular} alt={photo.alt_description} key={photo.id} />
      ))}
    </div>
  );
}

export default App;