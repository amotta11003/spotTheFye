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
import TopStreamedArtist from '../TopStreamedArtist';
import { AggArtistMetrics } from '../AggMetrics';

const timeRanges = {
    'shortterm': 'Past Month',
    'mediumterm': 'Past 6 Months',
    'longterm': 'All Time'
}

const TopStreamedArtists = ({
    topStreamed,
    timeRange,
    updateTimeRangeArtists,
    classes
}) => (
    <div className='top-streamed-artists'>
        <TimeRangeButton onSelect={updateTimeRangeArtists}/>
        <div align='center'>
            <h2 className={classes.title}>{timeRanges[timeRange.artists]}</h2>
        </div>
        <AggArtistMetrics topStreamed={topStreamed} />
        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><h3 className={classes.title}>Rank</h3></TableCell>
                        <TableCell><h3 className={classes.title}>Name</h3></TableCell>
                        <TableCell><h3 className={classes.title}>Genres</h3></TableCell>
                        <TableCell><h3 className={classes.title}>Popularity</h3></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {topStreamed
                        .artists
                        .map((artist, index) => (
                            <TopStreamedArtist
                                rank={index + 1}
                                key={`${timeRange.artists}-${artist.id}`}
                                artist={artist}
                            />
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </div>
);

export default withStyles(tableStyle)(TopStreamedArtists);