import React from 'react';
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import tableStyle from '../../assets/jss/material-kit-react/views/table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const TopStreamedArtist = ({artist, rank, classes}) => (
    <TableRow>
        <TableCell><h3 className={classes.title}>{rank}</h3></TableCell>
        <TableCell>
            <a href={artist.uri}>
                <span>
            
                </span>
                <h5 className={classes.cardTitle}>{artist.name}</h5>
            </a>
        </TableCell>
        <TableCell>
            <p className={classes.title}>{artist
                .genres
                .join(', ')}</p>
        </TableCell>
        <TableCell><p className={classes.title}>{artist.popularity}</p></TableCell>
    </TableRow>
);

export default withStyles(tableStyle)(TopStreamedArtist);