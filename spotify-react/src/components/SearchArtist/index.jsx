import React from 'react';
import classNames from "classnames";
import { withStyles } from '@material-ui/core/styles';
import tableStyle from '../../assets/jss/material-kit-react/views/table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import RegularButton from '../CustomButton';
import Popover from '@material-ui/core/Popover';
import Success from '../Typography/Success';

const SearchArtist = ({
    artist, 
    rank,
    addSeed,
    popover,
    anchorEl,
    togglePopover,
    classes
}) => {
    if (artist.images.length > 0){
        return (
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
                    <RegularButton key={artist.name} variant="contained" color="warning" onClick={event => {
                        addSeed(artist);
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
                <a href={artist.uri}>
                    <h5 className={classes.cardTitle}>{artist.name}</h5>
                </a>
            </TableCell>
            <TableCell>
                <RegularButton key={artist.name} variant="contained" color="warning" onClick={event => {
                    addSeed(artist);
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

export default withStyles(tableStyle)(SearchArtist);