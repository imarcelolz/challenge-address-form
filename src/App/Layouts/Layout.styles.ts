import { Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
  '@global': {
    html: {
      fontSize: 14,
      [theme.breakpoints.up('sm')]: {
        fontSize: 14
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 14
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: 14
      }
    }
  },
  Logo: {
    '& > img': {
      height: '30px',
      marginRight: '10px',
      position: 'relative'
    },
  },
  Icons: {
    '& > a': {
      color: theme.palette.primary.main
    }
  },
  Header: {
    height: '50px',
    padding: '0px 50px'
  },
  Content: {
    padding: '15px 50px',
  }
});
