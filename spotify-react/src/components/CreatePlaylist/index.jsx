import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chips from 'react-chips';
import RegularButton from '../CustomButton';
import { title } from '../../assets/jss/material-kit-react';

const createPlaylistStyle = {
    buttons: {
        display: 'inline-block',
        verticalAlign: 'middle',
        padding: '9px'
    },
    title:{
        ...title
    }
}

const CreatePlaylist = ({
    userID,
    playlistGenerator,
    removeGenre,
    artistsOnChange,
    tracksOnChange,
    updateStep,
    toggleAlert,
    fetchRecommendation,
    classes
}) => (
    <div>
        <h4 className={classes.title}>Genres</h4>
        <Chips
        value={playlistGenerator.seedGenres}
        onChange={removeGenre}
        fromSuggestionsOnly={true}
        suggestions={[]}/>
        <br/>
        <h4 className={classes.title}>Artists</h4>
        <Chips
        value={Object.keys(playlistGenerator.seedArtists)}
        onChange={artistsOnChange}
        fromSuggestionsOnly={true}
        suggestions={[]}/>
        <br/>
        <h4 className={classes.title}>Tracks</h4>
        <Chips
        value={Object.keys(playlistGenerator.seedTracks)}
        onChange={tracksOnChange}
        fromSuggestionsOnly={true}
        suggestions={[]}/>
        <br/>
        <span className={classes.buttons}>
            <RegularButton color='warning' onClick={() => updateStep(playlistGenerator.activeStep, false)}>Back</RegularButton>
            <RegularButton color='warning' onClick={async () => {
                if (Object.keys(playlistGenerator.seedGenres).length + Object.keys(playlistGenerator.seedArtists).length + 
                    Object.keys(playlistGenerator.seedTracks).length > 5 || Object.keys(playlistGenerator.seedGenres).length + 
                    Object.keys(playlistGenerator.seedArtists).length + Object.keys(playlistGenerator.seedTracks).length === 0){
                        toggleAlert(playlistGenerator.alert);
                } else{
                    var options = {
                        userID: userID,
                        seedArtistIDs: Object.values(playlistGenerator.seedArtists),
                        seedTrackIDs: Object.values(playlistGenerator.seedTracks),
                        seedGenres: playlistGenerator.seedGenres,
                        seedArtists: Object.keys(playlistGenerator.seedArtists),
                        seedTracks: Object.keys(playlistGenerator.seedTracks),
                        limit: playlistGenerator.numSongs
                    };
                    for (var i = 0; i < playlistGenerator.attrs.length; i++){
                        var attr = playlistGenerator.attrs[i];
                        console.log("ATTR: ", attr);
                        if (attr.checked) { options[`target_${attr.name}`] = attr.value; }
                    }
                    console.log("PLAYLIST OPTIONS: ", options);
                    await fetchRecommendation(options);
                    updateStep(playlistGenerator.activeStep, true);
                }
            }}>Create Playlist!</RegularButton>
        </span><br/>
        <Dialog 
            open={playlistGenerator.alert}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id='alert-dialog-title'>{'Watch Your Seeds!'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    There must be at least 1 and at most 5 seeds (genres, artists, tracks combined).
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <RegularButton color='warning' onClick={() => toggleAlert(playlistGenerator.alert)}>OK</RegularButton>
            </DialogActions>
        </Dialog>
    </div>
);

export default withStyles(createPlaylistStyle)(CreatePlaylist);