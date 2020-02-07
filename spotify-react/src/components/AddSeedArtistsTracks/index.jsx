import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import RadioButtons from '../RadioButtons';
import TextField from '@material-ui/core/TextField';
import SearchResults from '../SearchResults';
import RegularButton from '../CustomButton';

const addSeedArtistsTracksStyle = {
    searchBar: {
        display: 'inline-block',
        verticalAlign: 'middle',
        padding: '9px'
    }
}

const AddSeedArtistsTracks = ({
    playlistGenerator,
    searchTypeOnChange,
    queryOnChange,
    fetchSearchResults,
    updateStep,
    addSeed,
    togglePopover,
    classes
}) => (
    <div align='center'>
        <RadioButtons 
        className={classes.searchBar}
        selectedRadio={playlistGenerator.searchType} 
        radioOnChange={searchTypeOnChange}/><br/>
        <TextField
            className={classes.searchBar}
            defaultValue="Pharrell" 
            onChange={queryOnChange} 
            variant="filled" 
            label={(playlistGenerator.searchType.charAt(0)).toUpperCase() + playlistGenerator.searchType.slice(1, -1)}
            />
        <RegularButton 
            className={classes.searchBar}
            color='warning' 
            onClick={() => fetchSearchResults(playlistGenerator.query, playlistGenerator.searchType)}>
            Search
        </RegularButton><br/>
        <span>
            <RegularButton color='warning' onClick={() => updateStep(playlistGenerator.activeStep, false)}>Back</RegularButton>
            <RegularButton color='warning' onClick={() => updateStep(playlistGenerator.activeStep, true)}>Next</RegularButton>
        </span>
        <br/>
        <SearchResults 
            searchType={playlistGenerator.searchType} 
            searchResults={playlistGenerator.searchResults} 
            addSeed={addSeed}
            popover={playlistGenerator.popover}
            anchorEl={playlistGenerator.anchorEl}
            togglePopover={togglePopover}/>
        <span>
            <RegularButton color='warning' onClick={() => updateStep(playlistGenerator.activeStep, false)}>Back</RegularButton>
            <RegularButton color='warning' onClick={() => updateStep(playlistGenerator.activeStep, true)}>Next</RegularButton>
        </span>  
    </div>
);

export default withStyles(addSeedArtistsTracksStyle)(AddSeedArtistsTracks);