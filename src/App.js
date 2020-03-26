import React, { useState, useEffect } from 'react';
import PhotoGrid from './components/PhotoGrid';
import NavBar from './components/NavBar';
import Search from './components/Search';
import Unsplash, { toJson } from 'unsplash-js';
import { APIkey } from './config/keys';

const unsplash = new Unsplash({accessKey: APIkey});

function App() {
  const [photos, setPhotos] = useState([]);
  const [width, setWidth] = useState(document.body.clientWidth);

  //when App first loads, make an initial request for photos to display
  useEffect(() => {
    async function getInitialPhotos() {
      const response = await unsplash.search.photos("California", 1, 12).then(toJson).then(json => json.results);

      setPhotos(response);
    }

    getInitialPhotos();
  }, []);

  //to detect screen change and dynamically resize the PhotoGrid
  useEffect(() => {
    function handleResize(){
      setWidth(document.body.clientWidth);
    }

    window.addEventListener('resize', handleResize);

    //clean up by removing event listener
    return _ => {
      window.removeEventListener('resize', handleResize);
    }

  });

  return (
    <div>
      <NavBar />
      <Search setPhotos={setPhotos} />
      <PhotoGrid photos={photos} width={width} />
    </div>
  );
}

export default App;