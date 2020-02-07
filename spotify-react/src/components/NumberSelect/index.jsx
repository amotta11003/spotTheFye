import React from 'react';
import classNames from "classnames";
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { title } from '../../assets/jss/material-kit-react';

const numberSelectStyle = {
  playlistLength: {
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  title: {
    ...title,
    minHeight: "32px",
    verticalAlign: 'middle',
    padding: '9px',
    textDecoration: "none"
  }
}

const NumberSelect = ({
    numSongs,
    numSongsChange,
    classes
}) => (
    <div align='center'>
        <FormControl variant="outlined">
        <span>
        <h4 className={classNames(classes.playlistLength, classes.title)} id="num-songs-label">Playlist Length:</h4>
        <Select
          id="num-songs-outlined"
          value={numSongs}
          onChange={numSongsChange}
          autoWidth={true}>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={60}>60</MenuItem>
          <MenuItem value={70}>70</MenuItem>
          <MenuItem value={80}>80</MenuItem>
          <MenuItem value={90}>90</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
        </span>
      </FormControl>
    </div>
);

export default withStyles(numberSelectStyle)(NumberSelect);