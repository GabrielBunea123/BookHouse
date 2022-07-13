import React from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const MainButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#374785"),
    backgroundColor: "#374785",
    '&:hover': {
        backgroundColor: "#26315d",
    },
}));

export default MainButton