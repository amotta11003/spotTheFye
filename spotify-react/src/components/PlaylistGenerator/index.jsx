import React from 'react';
import RegularButton from '../CustomButton';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CreatePlaylist from '../CreatePlaylist';
import AddSeedArtistsTracks from '../AddSeedArtistsTracks';
import AddSeedGenreAttrs from '../AddSeedGenreAttrs';
import Success from '../Typography/Success';
import { title } from '../../assets/jss/material-kit-react';

const steps = ['Tune your playlist!', 'Add seed artists & tracks!', 'Create playlist!'];

const PlaylistGenerator = ({
    userID,
    searchTypeOnChange,
    fetchSearchResults,
    numSongsChange,
    genresOnChange,
    removeGenre,
    artistsOnChange,
    tracksOnChange,
    queryOnChange,
    playlistGenerator,
    addSeed,
    updateStep,
    fetchRecommendation,
    toggleAlert,
    togglePopover,
    reset,
    attrChange,
    switchChange
}) => (
    <div>
        <h1 style={title} align='center'>Playlist Generator</h1>
            <Stepper alternativeLabel activeStep={playlistGenerator.activeStep}>
                {steps
                    .map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
            </Stepper>
            <div>
                {playlistGenerator.activeStep === steps.length ? (
                    <div align='center'>
                        <Success align='center'>Time to enjoy your new creation! Go and check it out on Spotify!</Success>
                        <RegularButton color='warning' onClick={() => {
                            reset();
                            updateStep(playlistGenerator.activeStep, true);
                            }}>Start Again</RegularButton>
                    </div>
                ):(
                    <div>
                        {playlistGenerator.activeStep === 0 ? (
                            <AddSeedGenreAttrs
                            playlistGenerator={playlistGenerator}
                            genresOnChange={genresOnChange}
                            updateStep={updateStep}
                            attrChange={attrChange}
                            switchChange={switchChange}
                            numSongsChange={numSongsChange}/>
                        ):(
                            <div>
                                {playlistGenerator.activeStep === 1 ? (
                                    <AddSeedArtistsTracks
                                    playlistGenerator={playlistGenerator}
                                    searchTypeOnChange={searchTypeOnChange}
                                    queryOnChange={queryOnChange}
                                    fetchSearchResults={fetchSearchResults}
                                    updateStep={updateStep}
                                    addSeed={addSeed}
                                    togglePopover={togglePopover}/>
                                ): (
                                    <CreatePlaylist
                                    userID={userID}
                                    playlistGenerator={playlistGenerator}
                                    removeGenre={removeGenre}
                                    artistsOnChange={artistsOnChange}
                                    tracksOnChange={tracksOnChange}
                                    updateStep={updateStep}
                                    toggleAlert={toggleAlert}
                                    fetchRecommendation={fetchRecommendation}/>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
    </div>
);

export default PlaylistGenerator;