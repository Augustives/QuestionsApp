import { createTheme } from "@mui/material"

const correctGreen = '#00d123'
const wrongRed = '#d10000'

export default createTheme({
    palette: {
        common: {
            correctGreen: correctGreen,
            wrongRed: wrongRed
        },
        primary: {
            main: correctGreen
        },
        secondary: {
            main: wrongRed
        },
    },
    typography: {
        button: {
            color: 'black',
            fontWeight: 700,
            fontSize: '1rem',
            margin: '1rem'
        },
        title: {
            color: 'black',
            fontSize: '2rem',
            margin: '2.5rem'
        }
    },
    tags: {
        grid: {
            minHeight: '50vh'
        },
    }
})
