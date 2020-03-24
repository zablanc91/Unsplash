import React, { useState, useEffect } from 'react';
import './App.css';
import PhotoGrid from './components/PhotoGrid';
import Unsplash, { toJson } from 'unsplash-js';
import Grid from '@material-ui/core/Grid';

import { APIkey } from './config/keys';

const unsplash = new Unsplash({accessKey: APIkey});

function App() {
  const [photos, setPhotos] = useState([]);

  //when App first loads, make an initial request for photos to display
  useEffect(() => {
    async function getInitialPhotos() {
      const response = await unsplash.search.photos("California", 1, 12).then(toJson).then(json => json.results);
      console.log(response);
      setPhotos(response);
    }

    getInitialPhotos();
  }, [photos]);

  return (
    <div>
      <h3>Unsplash</h3>
      <PhotoGrid photos={photos} width={document.body.clientWidth} />
    </div>
  );
}

export default App;