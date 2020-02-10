import React from 'react';
import classNames from "classnames";
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import GridItem from '../Grid/GridItem';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import { attrInfo } from '../../constants';

const attrSliderStyle = {
    tooltip: {
        fontSize: "2em"
    }
};

const AttrSlider = ({
    attr,
    attrChange,
    switchChange,
    classes
}) => (
    <div align='center'>
        <GridItem>
            <Slider
                min={attr.min}
                max={attr.max}
                step={attr.step}
                disabled={!attr.checked}
                valueLabelDisplay="on"
                value={attr.value}
                onChange={attrChange}
                aria-labelledby={attr.name}/>
            <FormControlLabel
                control={ <Switch checked={attr.checked} onChange={() => switchChange(attr.name)}/>} 
                label={attr.checked ? `${attr.name} on` : `${attr.name} off`}
                labelPlacement='end'
            />
            <GridItem>
                <Tooltip className={classes.tooltip} disableFocusListener disableTouchListener title={attrInfo[attr.name]}>
                    <InfoIcon/>
                </Tooltip>
            </GridItem>
        </GridItem><br/>
    </div>
);

export default withStyles(attrSliderStyle)(AttrSlider);