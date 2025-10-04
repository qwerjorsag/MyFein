import { TypographyOptions } from "@mui/material/styles/createTypography";

const typography: TypographyOptions = {
    fontFamily: '"Roboto", sans-serif',
    h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        color: '#2b3e42', // Darker shade for headings
        textAlign: "center",
        marginTop: "20px"
    },
    h2: {
        fontSize: '2rem',
        fontWeight: 600,
        color: '#2b3e42',
        textAlign: "center",
        margin: "20px"
    },
    h3: {
        fontSize: '1.75rem',
        fontWeight: 500,
        color: '#2b3e42',
        textAlign: "center",
        margin: "20px"
    },
    body1: {
        fontSize: '1rem',
        color: '#2b3e42',
        textAlign: 'center'
    },
    body2: {
        fontSize: '0.875rem',
        color: '#555555',
    },
    button: {
        textTransform: 'none', // Prevents uppercase transformation for buttons
        fontSize: '0.875rem',
        color: '#fff', // Ensures buttons have white text color
    },
};

export default typography;
