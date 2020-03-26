import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { makeStyles } from '@material-ui/core/styles';
import PhotoGridTheme from '../styles/PhotoGridTheme';
import IconButton from '@material-ui/core/IconButton';
import ZoomInIcon from '@material-ui/icons/ZoomIn';

const useStyles = makeStyles(theme => (PhotoGridTheme));

const PictureGrid = ({photos, width}) => {
    //helper function to dynamically resize photo grid based on screen width in pixels
   const getGridListCols = () => {
    //xl breakpoint
    if(width > 1920){
        return 4;
    }
    //lg breakpoint
    else if(width > 1280){
        return 3;
    }
    //md breakpoint
    else if(width > 960){
        return 2;
    }
    //sm and xs breakpoint
    return 1;
}

const classes = useStyles();

    return(
        <div className={classes.photoGridContainer}>
            <GridList cellHeight={240} cols={getGridListCols()}>
                {photos.map (photo => (
                    <GridListTile key={photo.id} cols={1} >
                        <img src={photo.urls.regular} alt={photo.alt_description}  
                        />
                        <GridListTileBar className={classes.titleBar} subtitle={<span>by: {photo.user.name}</span>} actionIcon={
                            <IconButton onClick={() => console.log('click')}>
                                <ZoomInIcon />
                            </IconButton>
              } />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

export default PictureGrid;