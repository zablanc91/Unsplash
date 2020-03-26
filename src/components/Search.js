import React from 'react';
import TextField from '@material-ui/core/TextField';
import Unsplash, { toJson } from 'unsplash-js';
import { APIkey } from '../config/keys';

const Search = ({setPhotos}) => {
    const unsplash = new Unsplash({accessKey: APIkey});

    //make an API call for photos when the user presses enter and set state, clear it out if blank
    const onTextChange = async (e) => {
        var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
        
        if(charCode == 13){
            console.log('pressed enter');
            let term = e.target.value;

            if(term === ''){
                setPhotos([]);
            }
            else{
                const response = await unsplash.search.photos(term, 1, 12).then(toJson).then(json => json.results);
                console.log('setting photos');
                setPhotos(response);
            }
        }

    }

    return(
        <div>
            <TextField 
                label="Enter a search term then press Enter" 
                fullWidth={true} 
                onKeyPress={onTextChange}    
            />
        </div>
    );
}

export default Search;