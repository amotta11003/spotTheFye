import React from 'react';
import classNames from "classnames";
import { withStyles } from '@material-ui/core/styles';
import tableStyle from '../../assets/jss/material-kit-react/views/table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import RegularButton from '../CustomButton';
import Popover from '@material-ui/core/Popover';
import Success from '../Typography/Success';

const SearchTrack = ({
    track, 
    rank,
    addSeed,
    popover,
    anchorEl,
    togglePopover,
    classes
}) => {
    if (track.album.images.length > 0){
        return (
            <TableRow>
                <TableCell><h3 className={classes.title}>{rank}</h3></TableCell>
                <TableCell>
                    <a href={track.uri}>
                        <span>
                            <img src={track.album.images[2].url} alt={track.name}
                                className={classNames(classes.imgRaised,classes.imgRounded,classes.imgFluid)}/>
                        </span>
                        <h5 className={classes.cardTitle}>{track.name}</h5>
                    </a>
                </TableCell>
                <TableCell>
                    <p className={classes.title}>{track.album.artists.map(artist => (
                        <span>{artist.name}</span>))}
                    </p>
                </TableCell>
                <TableCell>
                <RegularButton key={track.name} variant="contained" color="warning" onClick={event => {
                    addSeed(track);
                    togglePopover(event);
                    }}>
                    Add Seed
                </RegularButton>
                <Popover 
                    id='popover' 
                    open={popover} 
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}>
                        <Success>Seed Added!</Success>
                        <RegularButton color='warning' onClick={() => togglePopover(null)}>OK</RegularButton>
                    </Popover>
                </TableCell>
            </TableRow>
        );
    } else return (
        <TableRow>
            <TableCell><h3 className={classes.title}>{rank}</h3></TableCell>
            <TableCell>
                <a href={track.uri}>
                    <h5 className={classes.cardTitle}>{track.name}</h5>
                </a>
            </TableCell>
            <TableCell>
                <p className={classes.title}>{track.album.artists.map(artist => (
                    <span>{artist.name}</span>))}
                </p>
            </TableCell>
            <TableCell>
            <RegularButton key={track.name} variant="contained" color="warning" onClick={event => {
                addSeed(track);
                togglePopover(event);
                }}>
                Add Seed
            </RegularButton>
            <Popover 
                id='popover' 
                open={popover} 
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}>
                <Success>Seed Added!</Success>
                <RegularButton color='warning' onClick={() => togglePopover(null)}>OK</RegularButton>
            </Popover>
            </TableCell>
        </TableRow>
    );
};

export default withStyles(tableStyle)(SearchTrack);