import React from 'react';
import SearchArtists from '../SearchArtists';
import SearchTracks from '../SearchTracks';

const SearchResults = ({
    searchType,
    searchResults,
    addSeed,
    popover,
    anchorEl,
    togglePopover
}) => {
    switch (searchType){
        case 'artists':
            return (
                <SearchArtists 
                searchResults={searchResults} 
                addSeed={addSeed}
                popover={popover}
                anchorEl={anchorEl}
                togglePopover={togglePopover}
                />
            );
        case 'tracks':
            return (
                <SearchTracks 
                searchResults={searchResults} 
                addSeed={addSeed}
                popover={popover}
                anchorEl={anchorEl}
                togglePopover={togglePopover}
                />
            );
        default:
            return 
    }
};

export default SearchResults;