import logo from '@/Assets/Images/Logo.svg';
import { createMuiTheme, Grid, makeStyles, MuiThemeProvider, Paper, responsiveFontSizes } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import React from 'react';
import { styles } from './Layout.styles';

const useStyles = makeStyles(styles);
const theme = responsiveFontSizes(createMuiTheme(), { factor: 0.1 });

export const Layout = (props) => {

  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <Grid>
        <Grid container direction="row" alignItems="center" component={Paper} justify="space-between" className={classes.Header}>
          <Grid item className={classes.Logo} xs={6}>
            <img alt={logo} src={logo} />
          </Grid>
          <Grid item>
            <a href="https://imarcelolz.github.io"><DescriptionIcon /></a>
          </Grid>
        </Grid>
        <Grid container item md={12} className={classes.Content}>
          {props.children}
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}
