# SpotTheFye

General
- Track your Spotify listening habits and create playlists for any mood

Features
- Access to user's top streamed artists/tracks over the short/medium/long term
- Playlist Generator
  - Users can generate playlists with any 5 seed genres/artists/tracks with tuneable target attributes (danceability,             popularity, valence, etc.)
  - Generated playlists can then be found in user's Spotify library for immediate listening (private playlists)
  
Technologies
- Node backend used with Node-Spotify API wrapper
  - User Endpoints:
    - shortTermArtists
    - mediumTermArtists
    - longTermArtists
    - shortTermTracks
    - mediumTermTracks
    - longTermTracks
    - searchArtist
    - searchTrack
    - recommendation
    - createPlaylist
    - loadPlaylist
 
 - React frontend
  - Redux used to manage application state
  - Material-UI used for base components 
    
