import colors from './colors';

const components = {
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 10, // Default button border radius
                padding: '10px 20px', // Default button padding
                justifyContent: 'center', // Center content
                alignItems: 'center',
                color: 'white', // Text color
                fontSize: '1rem', // Font size
                transition: 'all 0.3s ease', // Smooth transition for all properties

                '&:hover': {
                    backgroundColor: colors.primary.dark, // Use imported color
                    color: '#fff', // Text color on hover
                    transform: 'scale(1.1)', // Scale effect on hover
                    fontSize: '1.05rem',
                    cursor: "pointer",
                },

                '&.Mui-disabled': {
                    backgroundColor: 'gray',
                    opacity: 0.6,
                    pointerEvents: 'none',
                    cursor: 'not-allowed',
                },
            },
        },
    },

    MuiTextField: {
        styleOverrides: {
            root: {
                marginBottom: 16,
            },
        },
    },

    MuiDialogActions: {
        styleOverrides: {
            root: {
                padding: 20,
                justifyContent: 'center',
            },
        },
    },

    MuiTooltip: {
        styleOverrides: {
            tooltip: {
                fontSize: '1rem',
                borderRadius: '10px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                textAlign: "center",
            } as any, // Explicitly cast to `any` to satisfy TypeScript
        },
    },

    MuiPickersDay: {
        styleOverrides: {
            root: {
                "&.MuiPickersDay-root.Mui-selected": {
                    backgroundColor: colors.primary.light, // Use imported color
                    borderWidth: '2px',
                    borderColor: colors.primary.dark, // Use imported color
                    border: '1px solid',
                    scale: "1.1",
                },

                '&.Mui-selected': {
                    backgroundColor: colors.primary.main, // Use imported color
                    borderColor: colors.primary.dark, // Use imported color
                    color: '#000',
                    '&:hover': {
                        backgroundColor: colors.primary.dark, // Use imported color
                    },
                },

                '&:hover': {
                    backgroundColor: colors.primary.light, // Use imported color
                    borderColor: colors.primary.dark, // Use imported color
                    color: '#000',
                    scale: "1.1",
                    opacity: 0.8,
                },
            },
        },
    },

    MuiPickersArrowSwitcher: {
        styleOverrides: {
            root: {
                button: {
                    '& .MuiIconButton-root': {
                        color: colors.primary.main, // Set arrow color to primary dark
                    },
                },
            },
        },
    },
    MuiIconButton: {
        styleOverrides: {
            root: {
                color: colors.primary.main, // Set default arrow color
            },
        },
    },
};

export default components;
