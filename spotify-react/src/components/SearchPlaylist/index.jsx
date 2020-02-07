import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import RegularButton from '../CustomButton';

const SearchPlaylist = ({
    playlist, 
    rank,
    addSeed
}) => {
    if (playlist.images.length > 0){
        return (
            <TableRow>
                <TableCell>{rank}</TableCell>
                <TableCell><a href={playlist.uri}>
                    <span>{playlist.name}</span>
                    </a>
                </TableCell>
                <TableCell>
                    <a href={playlist.owner.uri}>
                        <span>{playlist.owner.display_name}</span>
                    </a>
                </TableCell>
                <TableCell>
                    <RegularButton key={playlist.name} variant="contained" color="primary" onClick={addSeed(playlist)}>
                        Add Seed
                    </RegularButton>
                </TableCell>
            </TableRow>
        );
    } else return (
        <TableRow>
            <TableCell>{rank}</TableCell>
            <TableCell><a href={playlist.uri}>
                <span>{playlist.name}</span>
                </a>
            </TableCell>
            <TableCell>
                <a href={playlist.owner.uri}>
                    <span>{playlist.owner.display_name}</span>
                </a>
            </TableCell>
            <TableCell>
                <RegularButton key={playlist.name} variant="contained" color="primary" onClick={addSeed(playlist)}>
                    Add Seed
                </RegularButton>
            </TableCell>
        </TableRow>
    );
};

export default SearchPlaylist;