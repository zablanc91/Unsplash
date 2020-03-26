import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import '../App.css';

const PictureGrid = ({photos, width}) => {
    //helper function to dynamically resize photo grid based on screen width in pixels
   const getGridListCols = () => {
    if(width > 1920){
        return 4;
    }
    else if(width > 1280){
        return 3;
    }
    else if(width > 960){
        return 2;
    }
    return 1;
}

    return(
        <div className="photoGridContainer">
            <GridList cellHeight={480} cols={getGridListCols()}>
                {photos.map (photo => (
                    <GridListTile key={photo.id} cols={1}>
                        <img src={photo.urls.regular} alt={photo.alt_description} />
                        <GridListTileBar className="titleBar" subtitle={<span>by: {photo.user.name}</span>} />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

export default PictureGrid;