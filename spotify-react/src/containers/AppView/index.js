import React, { Component } from 'react';
import classNames from "classnames";
import logo from '../../assets/img/spotTheFye.png';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import TopStreamed from '../../components/TopStreamed';
import Parallax from '../../components/Parallax';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Info from '../../components/Typography/Info';
import { fetchTopStreamed, getAppViewData, updateTimeRangeArtists, 
  updateTimeRangeTracks, fetchSearchResultsAsync, updateSearchType, 
  updateGenres, updateQuery, addSeed, updateStep,
  updateSeedArtists, updateSeedTracks, fetchRecommendationAsync, 
  logout, login, toggleAlert, togglePopover, removeGenre, 
  reset, attrChange, switchChange, numSongsChange} from '../../actions';
import appViewStyle from '../../assets/jss/material-kit-react/views/AppView';

class AppView extends Component {

  componentDidMount() {
    this.props.fetchTopStreamed();
  }

  render() {
    const {
      user,
      topStreamed,
      timeRange,
      playlistGenerator,
      classes
    } = this.props;
    if (!user.loggedIn) {this.props.login()}
    console.log("User: ", user);
    console.log("Top Streamed: ", topStreamed);
    console.log("Time Range: ", timeRange);
    console.log("Playlist Generator: ", playlistGenerator);

    return (
      <div>
        <Parallax filter image={require('../../assets/img/header.jpg')}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <img className={classes.title} src={logo} alt="logo"/>
                <h4>Welcome! Check out your Spotify listening habits! While you're at it, create a playlist for any mood!</h4>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <TopStreamed 
              userID={user.userID}
              topStreamed={topStreamed} 
              timeRange={timeRange} 
              updateTimeRangeArtists={this.props.updateTimeRangeArtists} 
              updateTimeRangeTracks={this.props.updateTimeRangeTracks}
              searchTypeOnChange={this.props.updateSearchType}
              fetchSearchResults={this.props.fetchSearchResultsAsync}
              numSongsChange={this.props.numSongsChange}
              genresOnChange={this.props.updateGenres}
              removeGenre={this.props.removeGenre}
              artistsOnChange={this.props.updateSeedArtists}
              tracksOnChange={this.props.updateSeedTracks}
              queryOnChange={this.props.updateQuery}
              playlistGenerator={playlistGenerator}
              addSeed={this.props.addSeed}
              updateStep={this.props.updateStep}
              fetchRecommendation={this.props.fetchRecommendationAsync}
              toggleAlert={this.props.toggleAlert}
              togglePopover={this.props.togglePopover}
              reset={this.props.reset}
              attrChange={this.props.attrChange}
              switchChange={this.props.switchChange}
              />
            <h4 className={classes.header}>To Log Out...</h4><br/>
            <Info>Go to <a href={'https://accounts.spotify.com/'}>accounts.spotify.com</a> to log out. 
            You can then return to spotthefye.herokuapp.com to sign in with a different account!</Info><br/><br/>
          </div>
        </div>
      </div>
    );
  }
}

AppView.propTypes = {
  topStreamed: PropTypes.object,
};

const mapStateToProps = getAppViewData;

const mapDispatchToProps = { 
  login,
  logout, 
  fetchTopStreamed, 
  updateTimeRangeArtists, 
  updateTimeRangeTracks, 
  fetchSearchResultsAsync, 
  updateSearchType,
  updateGenres,
  removeGenre,
  updateSeedArtists,
  updateSeedTracks,
  updateQuery,
  addSeed,
  updateStep,
  fetchRecommendationAsync,
  toggleAlert,
  togglePopover,
  reset,
  attrChange,
  switchChange,
  numSongsChange
};

const connectedAppView = withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
   pure: false
})(withStyles(appViewStyle)(AppView)));

export { connectedAppView as AppView };

