import { createTheme } from '@mui/material';

const theme = createTheme({
  // https://mui.com/material-ui/customization/palette/
  palette: {
    primary: {
      main: '#264653'
    },
    secondary: {
      main: '#2A9D8F'
    }
  },
  // https://mui.com/material-ui/customization/theme-components/
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    }
  }
});

export default theme;
