import { createTheme } from '@mui/material/styles';
import colors from './colors';
import typography from './typography';
import spacing from './spacing';
import components from './components';
import breakpoints from './breakpoints';

const theme = createTheme({
    palette: colors,
    typography: typography,
    spacing: spacing,
    breakpoints: breakpoints,
    components: components,
});

export default theme;
