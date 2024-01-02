import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Box } from '@mui/material'
const NotFound = () => {
    return (
        <>
        <Navbar/>
        <Box sx={{height:'81vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <h1>Page not found</h1>
        </Box>
           <Footer/> 
        </>
    )
}

export default NotFound