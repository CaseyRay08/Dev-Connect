import React from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import { Box, Typography } from '@mui/material'
import devconnect from '../../assets/DevConnect.jpg'
import FlexBetween from '../../components/FlexBetween'



const Home = () => {

    return (
        <Box>
            <Navbar />
            <FlexBetween gap='4rem' style={{
                backgroundImage: `url(${devconnect})`,
                backgroundSize: '50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center 3rem',
                height: '100vh',
                backgroundBorder: '2px solid pink'
            }}>
            </FlexBetween>
        </Box>
    )
}

export default Home