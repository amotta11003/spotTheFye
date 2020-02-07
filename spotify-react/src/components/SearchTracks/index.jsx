import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import tableStyle from '../../assets/jss/material-kit-react/views/table';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchTrack from '../SearchTrack';

const SearchTracks = ({
    searchResults,
    addSeed,
    popover,
    anchorEl,
    togglePopover,
    classes
}) => (
    <div className='search-tracks'>
        <TableContainer>
            <Table aria-label="track search results">
                <TableHead>
                    <TableRow>
                        <TableCell><h3 className={classes.title}>Result #</h3></TableCell>
                        <TableCell><h3 className={classes.title}>Name</h3></TableCell>
                        <TableCell><h3 className={classes.title}>Artist(s)</h3></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {searchResults
                        .map((track, index) => (
                            <SearchTrack
                                rank={index + 1}
                                key={track.id}
                                track={track}
                                addSeed={addSeed}
                                popover={popover}
                                anchorEl={anchorEl}
                                togglePopover={togglePopover}
                            />
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </div>
);

export default withStyles(tableStyle)(SearchTracks);