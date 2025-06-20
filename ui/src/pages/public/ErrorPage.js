import { Box, CssBaseline, Typography } from '@mui/material'
import React from 'react'

function ErrorPage() {
    return (
        <Box style={{ paddingTop: 300 }}>
            <CssBaseline />
            <Typography style={{ textAlign: 'center' }} variant='h4'>Page not found</Typography>
        </Box>
    )
}

export default ErrorPage
