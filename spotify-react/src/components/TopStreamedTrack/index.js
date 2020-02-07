import React from 'react';
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import tableStyle from '../../assets/jss/material-kit-react/views/table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const TopStreamedTrack = ({track, rank, classes}) => (
    <TableRow>
        <TableCell><h3 className={classes.title}>{rank}</h3></TableCell>
        <TableCell>
            <a href={track.uri}>
                <span>
                    <img src={track.album.images[2].url} alt={track.name}
                        className={classNames(classes.imgRaised,classes.imgRounded,classes.imgFluid)}/></span>
                <h5 className={classes.cardTitle}>{track.name}</h5>
            </a>
        </TableCell>
        <TableCell>
            <p className={classes.title}>{track.album.artists.map(artist => (
                    <span>{artist.name}</span>
                ))}</p>
        </TableCell>
        <TableCell><p className={classes.title}>{track.popularity}</p></TableCell>
    </TableRow>
);

export default withStyles(tableStyle)(TopStreamedTrack);