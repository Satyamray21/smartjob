import { colors } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import "@fontsource/poppins";

const AppTheme = createTheme({
    breakpoints: {
        values: {
            // xl: 1536,
            // lg: 1200,
            // md: 900,
            // sm: 600,
            // xs: 0,
            xs: 0,
            sm: 480,
            md: 768,
            lg: 1024,
            xl: 1368,
            xxl: 1980
        }
    },
    size: 10,
    spacing: 8,
    palette: {
        mode: 'light',
        background: {
            default: "hsl(0, 0%, 100%)",
        },
        primary: {
            main: colors.teal[900],
            dark: colors.teal[500],
            deem: colors.teal[200],
            light: colors.teal[50],
        },
        secondary: {
            main: colors.deepPurple[900],
            dark: colors.deepPurple[500],
            deem: colors.deepPurple[200],
            light: colors.deepPurple[50]
        },
        info: {
            main: colors.blueGrey[900],
            dark: colors.blueGrey[700],
            deem: colors.blueGrey[500],
            light: colors.blueGrey[50]
        },
        success: {
            main: colors.teal[900],
            dark: colors.teal[500],
            deem: colors.teal[200],
            light: colors.teal[50]
        },
        error: {
            main: colors.red[900],
            dark: colors.red[500],
            deem: colors.red[200],
            light: colors.red[50],
        },

        blue: '#131938',
        tintBlue: '#326EE6'
    },
    shape: {
        borderRadius: 5
    },
    typography: {
        fontSize: 25,
        htmlFontSize: 30,
        h1: {
            fontWeight: 300,
            fontSize: "6rem",
            lineHeight: 1.167,
            letterSpacing: "-0.01562em"
        },
        h2: {
            fontWeight: 300,
            fontSize: "3.75rem",
            lineHeight: 1.2,
            letterSpacing: "-0.00833em"
        },
        h3: {
            fontWeight: 400,
            fontSize: "3rem",
            lineHeight: 1.167,
            letterSpacing: "0em"
        },
        h4: {
            fontWeight: 400,
            fontSize: "1.650rem",
            lineHeight: 1.235,
            letterSpacing: "0.00735em"
        },
        h5: {
            fontWeight: 400,
            fontSize: "1.2rem",
            lineHeight: 1.334,
            letterSpacing: "0em"
        },
        h6: {
            fontWeight: 400,
            fontSize: "1.0rem",
            lineHeight: 1.6,
            letterSpacing: "0.0075em"
        },
        body1: {
            fontFamily: "Poppins",
            fontWeight: '700',
            fontSize: "0.678rem",
            lineHeight: 1.5,
            letterSpacing: "0.01038em"
        },
        body2: {
            fontFamily: "Poppins",
            fontWeight: 400,
            fontSize: "0.675rem",
            lineHeight: 1.43,
            letterSpacing: "0.01071em"
        },
        subtitle1: {
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: 1.75,
            letterSpacing: "0.00938em"
        },
        subtitle2: {
            fontWeight: 500,
            fontSize: "0.875rem",
            lineHeight: 1.57,
            letterSpacing: "0.00714em"
        },
        button: {
            fontWeight: 400,
            fontSize: "0.575rem",
            lineHeight: 1.45,
            letterSpacing: "0.02857em",
            textTransform: "uppercase",
        },
        caption: {
            fontWeight: 400,
            fontSize: "0.75rem",
            lineHeight: 1.66,
            letterSpacing: "0.03333em"

        },
        overline: {
            fontWeight: 400,
            fontSize: "0.75rem",
            lineHeight: 1.66,
            letterSpacing: "0.08333em",
            textTransform: "uppercase"
        }
    },
    mixins: {
        toolbar: {
            minHeight: 25
        }
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '0px 12px',
                    height: 32,
                    lineHeight: '10px',
                    borderBottom: '1px solid #FEFEFE',
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:nth-of-type(even)': {
                        fontSize: '10px',
                        backgroundColor: '#F0F1F5'
                    },
                    '&:last-child td, &:last-child th': {
                        fontSize: '10px',
                        border: 0,
                    },
                    borderBottom: '1px solid #FEFEFE',
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    height: 30,
                },
            },
        },
        MuiTableFooter: {
            styleOverrides: {
                root: {
                    backgroundColor: '#F0F1F5',
                    height: 20,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontWeight: 'bold',
                    fontSize: '12px',
                    minHeight: '10px',
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    minHeight: '10px',
                },
            },
        },
        MuiTablePagination: {
            styleOverrides: {
                root: {
                    background: '#fff',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 0,
                        background: 'none',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: 0,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: 0,
                    },
                },
                input: {
                    padding: '8px 12px',
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    padding: '3px',
                    '& svg': {
                        fontSize: '15px',
                    },
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    my: 1,
                    height: 27,
                    background: 'none',
                    '& svg': {
                        fontSize: '13px',
                    },
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f0f0f0',
                    margin: '10px 0',
                    '&:hover': {
                        backgroundColor: '#d0d0d0',
                    },
                },
            },
        },
    },

    // ... (rest of your theme configuration)
});



export default AppTheme