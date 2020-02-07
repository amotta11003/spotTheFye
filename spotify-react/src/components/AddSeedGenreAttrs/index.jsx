import React from 'react';
import classNames from "classnames";
import { withStyles } from '@material-ui/core/styles';
import RegularButton from '../CustomButton';
import GenreSearch from '../GenreSearch';
import AttrSlider from '../AttrSlider';
import NumberSelect from '../NumberSelect';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Small from '../../components/Typography/Small';
import { title } from '../../assets/jss/material-kit-react';

const addSeedGenreAttrsStyle = {
    attrs: {
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


const AddSeedGenreAttrs = ({
    playlistGenerator,
    genresOnChange,
    updateStep,
    attrChange,
    switchChange,
    numSongsChange,
    classes
}) => (
    <div>
        <span>
            <NumberSelect
                numSongs={playlistGenerator.numSongs}
                numSongsChange={numSongsChange}/>
            <GenreSearch 
                seedGenres={playlistGenerator.genres} 
                chipsOnChange={genresOnChange}/>
        </span><br/><br/>
        <div align='center'>
            <h3 className={classNames(classes.title, classes.attrs)}>Target Attributes</h3>
            <Tooltip disableFocusListener disableTouchListener className={classes.attrs}
                title={'Tracks with the attribute values nearest to the target values will be preferred. ' + 
                    'All target values will be weighed equally in ranking results. '}>
                <InfoIcon/>
            </Tooltip><br/>
            <Small>If you experience issues dragging slider, use keyboard's directional pad.</Small>
        </div>
        {playlistGenerator.attrs.map((attr, index) => (
            <AttrSlider
                key={index}
                attr={attr}
                attrChange={attrChange}
                switchChange={switchChange}/>
            ))}<br/>
        <RegularButton color='warning' onClick={() => updateStep(playlistGenerator.activeStep, true)}>Next</RegularButton>
    </div>
);

export default withStyles(addSeedGenreAttrsStyle)(AddSeedGenreAttrs);