import React, { useState } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { makeStyles } from '@material-ui/core/styles';
import PhotoGridTheme from '../styles/PhotoGridTheme';
import IconButton from '@material-ui/core/IconButton';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles(theme => (PhotoGridTheme));

const PictureGrid = ({photos, width}) => {
    //useStateHook to keep track of current image clicked to view in full size
    let dialogWidth = '';
    const [currentPhoto, updateCurrentPhoto] = useState({
        open: false,
        photo: {}
    });

    const openPhoto = (photo) => {
        updateCurrentPhoto({
            open: true,
            photo: photo
        });
    }

    const closePhoto = () => {
        updateCurrentPhoto({open: false, photo: {}});
    }

    //helper function to dynamically resize photo grid and dialog based on screen width in pixels
   const getGridListCols = () => {
    //xl breakpoint
    if(width > 1920){
        dialogWidth = 'xl';
        return 4;
    }
    //lg breakpoint
    else if(width > 1280){
        dialogWidth = 'lg';
        return 3;
    }
    //md breakpoint
    else if(width > 960){
        dialogWidth = 'md';
        return 2;
    }
    //sm and xs breakpoint
    dialogWidth = 'sm';
    return 1;
}

    const classes = useStyles();


    return(
        <div className={classes.photoGridContainer}>
            <GridList cellHeight={360} cols={getGridListCols()}>
                {photos.map (photo => (
                    <GridListTile key={photo.id} cols={1} >
                        <img src={photo.urls.regular} alt={photo.alt_description}  
                        />
                        <GridListTileBar className={classes.titleBar} subtitle={<span>by: {photo.user.name}</span>} actionIcon={
                            <IconButton onClick={() => openPhoto(photo)}>
                                <ZoomInIcon className={classes.zoomIcon} />
                            </IconButton>
              } />
                    </GridListTile>
                ))}
            </GridList>
            <Dialog onClose={closePhoto} open={currentPhoto.open} fullWidth={true} maxWidth={dialogWidth} >
                {(currentPhoto.open === false) ? null : <img src={currentPhoto.photo.urls.full} alt={currentPhoto.photo.alt_description} style={{ width: '100%'}}/>}
            </Dialog>
        </div>
    );
}

export default PictureGrid;