import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import tableStyle from '../../assets/jss/material-kit-react/views/table';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TimeRangeButton from '../TimeRangeButton';
import TopStreamedTrack from "../TopStreamedTrack";
import { AggTrackMetrics } from '../AggMetrics';

const TopStreamedTracks = ({
    topStreamed,
    timeRange,
    updateTimeRangeTracks,
    classes
}) => (
    <div className='top-streamed-tracks'>
        <TimeRangeButton onSelect={updateTimeRangeTracks}/>
        <AggTrackMetrics topStreamed={topStreamed} />
        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><h3 className={classes.title}>Rank</h3></TableCell>
                        <TableCell><h3 className={classes.title}>Name</h3></TableCell>
                        <TableCell><h3 className={classes.title}>Artists</h3></TableCell>
                        <TableCell><h3 className={classes.title}>Popularity</h3></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {topStreamed
                        .tracks
                        .map((track, index) => (
                            <TopStreamedTrack
                                rank={index + 1}
                                key={`${timeRange.tracks}-${track.id}`}
                                track={track}
                            />
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </div>
);

export default withStyles(tableStyle)(TopStreamedTracks);