import { createTheme } from '@mui/material/styles';

const buttonDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#333333',
    },
  },
});

export default buttonDarkTheme;