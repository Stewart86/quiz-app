import { CircularProgress, Typography } from '@material-ui/core'

import React from 'react'

export const Loading = () => {
    return (
        <>
        <CircularProgress style={{margin: "5rem"}}/>
        <Typography>
            Loading.. Please wait
        </Typography>
        </>
    )
}
