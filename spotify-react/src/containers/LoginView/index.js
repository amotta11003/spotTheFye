import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { history } from '../../helpers';
import logo from '../../assets/img/spotTheFye.png';
import RegularButton from '../../components/CustomButton';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import CardFooter from '../../components/Card/CardFooter';
import { login } from '../../actions';
import background from '../../assets/img/header.jpg';
import loginViewStyle from '../../assets/jss/material-kit-react/views/LoginView';

class LoginView extends Component {

  componentDidMount() {
    if (localStorage.getItem('loggedIn')) {
        history.push('/');
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div 
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + background + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
      }}>
        <div className={classes.container}>
          <GridContainer justify='center'>
            <GridItem xs={12} sm={12} md={4}>
              <CardFooter className={classes.cardHeader}>
                <img src={logo} alt="logo"/><br/>
              </CardFooter>
              <CardFooter className={classes.cardFooter}>
                <RegularButton 
                  size='lg'
                  variant="outlined" 
                  color='warning'
                  onClick={this.props.login}>
                    Log In
                </RegularButton>
              </CardFooter>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = { login };

const connectedLoginView = withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(withStyles(loginViewStyle)(LoginView)));

export { connectedLoginView as LoginView };
