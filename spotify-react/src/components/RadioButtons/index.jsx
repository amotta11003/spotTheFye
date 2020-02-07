import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export const RadioButtons = ({
    selectedRadio,
    radioOnChange
}) => (
    <div>
        <FormControl component="fieldset">
            <FormLabel component="legend">Search for {selectedRadio}:</FormLabel>
            <RadioGroup 
            aria-label="search-type" 
            name="search-type"
            value={selectedRadio} 
            onChange={radioOnChange}>
                <FormControlLabel value="artists" control={<Radio color='primary'/>} label="Artists" />
                <FormControlLabel value="tracks" control={<Radio color='primary'/>} label="Tracks" />
            </RadioGroup>
        </FormControl>
    </div>
);
export default RadioButtons;