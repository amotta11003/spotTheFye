import React from 'react';
import CustomTabs from '../CustomTabs';
import PeopleIcon from '@material-ui/icons/People';
import AlbumIcon from '@material-ui/icons/Album';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistGenerator from '../PlaylistGenerator';
import TopStreamedArtists from '../TopStreamedArtists';
import TopStreamedTracks from '../TopStreamedTracks';

const TopStreamed = ({
    userID,
    topStreamed,
    timeRange,
    updateTimeRangeArtists,
    updateTimeRangeTracks,
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
    <div className='top-streamed'>
        <CustomTabs
                headerColor='warning'
                tabs={[
                    {
                        tabName: "Artists",
                        tabIcon: PeopleIcon,
                        tabContent: (
                            <div className='top-streamed-artists'>
                                <TopStreamedArtists 
                                topStreamed={topStreamed} 
                                timeRange={timeRange} 
                                updateTimeRangeArtists={updateTimeRangeArtists}/>
                            </div>
                        )
                    },
                    {
                        tabName: "Tracks",
                        tabIcon: AlbumIcon,
                        tabContent: (
                            <TopStreamedTracks
                            topStreamed={topStreamed} 
                            timeRange={timeRange} 
                            updateTimeRangeTracks={updateTimeRangeTracks}/>
                            
                        )
                    },
                    {
                        tabName:"Playlist Generator",
                        tabIcon: PlaylistAddIcon,
                        tabContent: (
                            <PlaylistGenerator
                            userID ={userID}
                            searchTypeOnChange={searchTypeOnChange} 
                            fetchSearchResults={fetchSearchResults}
                            numSongsChange={numSongsChange}
                            genresOnChange={genresOnChange}
                            removeGenre={removeGenre}
                            artistsOnChange={artistsOnChange}
                            tracksOnChange={tracksOnChange}
                            queryOnChange={queryOnChange}
                            playlistGenerator={playlistGenerator}
                            addSeed={addSeed}
                            updateStep={updateStep}
                            fetchRecommendation={fetchRecommendation}
                            toggleAlert={toggleAlert}
                            togglePopover={togglePopover}
                            reset={reset}
                            attrChange={attrChange}
                            switchChange={switchChange}
                            />
                        )
                    }
                ]}
            />
    </div>
);

export default TopStreamed;