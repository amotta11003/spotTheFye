import React from 'react';
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import tableStyle from '../../assets/jss/material-kit-react/views/table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import MusicNoteTwoToneIcon from '@material-ui/icons/MusicNoteTwoTone';

const TopStreamedArtist = ({artist, rank, classes}) => {
    if (artist.images.length < 3){
        return (
            <TableRow>
                <TableCell><h3 className={classes.title}>{rank}</h3></TableCell>
                <TableCell>
                    <a href={artist.uri}>
                        <span>
                            <MusicNoteTwoToneIcon/>
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
    } else return (
        <TableRow>
            <TableCell><h3 className={classes.title}>{rank}</h3></TableCell>
            <TableCell>
                <a href={artist.uri}>
                    <span>
                    <img src={artist.images[2].url} alt={artist.name} 
                                className={classNames(classes.imgRaised,classes.imgRounded,classes.imgFluid)}/>
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
};


export default withStyles(tableStyle)(TopStreamedArtist);