import React from 'react'
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import { useMemo } from "react";
import { useSelector } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from './theme'
import UserAuth from './pages/userauth/UserAuth'

const App = () => {
    const mode = useSelector(state => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


    return (
        <div>
            <Router>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<UserAuth isLoggingIn={true} />} />
                        <Route path='/profile/:userId' element={<Profile />} />
                        <Route path='/register' element={<UserAuth isLoggingIn={false} />} />
                    </Routes>
                </ThemeProvider>
            </Router>
        </div>
    )
};

export default App