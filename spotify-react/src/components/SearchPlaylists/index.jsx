import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchPlaylist from '../SearchPlaylist';

const SearchPlaylists = ({
    searchResults
}) => (
    <div className='search-playlists'>
        <TableContainer component={Paper}>
            <Table aria-label="playlist search results">
                <TableHead>
                    <TableRow>
                        <TableCell>Result #</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Owner</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {searchResults
                        .map((playlist, index) => (
                            <SearchPlaylist
                                rank={index + 1}
                                key={playlist.id}
                                playlist={playlist}
                                addSeed={() => console.log("ADDING SEED")}
                            />
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </div>
);

export default SearchPlaylists;