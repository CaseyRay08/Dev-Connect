import React, { useState } from "react";
import { authActions } from "../../utilities/redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close } from "@mui/icons-material";
import { Box, IconButton, InputBase, Typography, useTheme, useMediaQuery } from "@mui/material"
import LoginIcon from '@mui/icons-material/Login';
import FlexBetween from "../../components/FlexBetween";

export const Navbar = () => {
    const [isMobileMenu, setIsMobileMenu] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 1039px)");

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    const fullName = `${user?.firstName} ${user?.lastName}`;
    //
    // ADD IN AN AVATAR FROM MATERIUL UI
    //
    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                    onClick={() => navigate("/")}
                    sx={{
                        "&:hover": {
                            color: primaryLight,
                            cursor: "pointer",
                        },
                    }}
                >
                    Dev-Connect
                </Typography>
                {isNonMobile && (
                    <FlexBetween
                        backgroundColor={neutralLight}
                        borderRadius="9px"
                        gap="3rem"
                        padding="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search" />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>
            {/* DESKTOP NAV */}
            {isNonMobile ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(authActions.setMode())}
                        title="dark/light mode.">
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <Message sx={{ fontSize: "25px" }} />
                    <Notifications sx={{ fontSize: "25px" }} />
                    <Help sx={{ fontSize: "25px" }} />
                    {user ? (
                        <>
                            <Typography color="primary" onClick={() => navigate("/profile")} sx={{
                                "&:hover": {
                                    color: neutralLight,
                                    cursor: "pointer",
                                },
                            }}>{fullName}</Typography>
                            <IconButton onClick={() => dispatch(authActions.setLogout())}>
                                <Typography color="red">Logout</Typography>
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <IconButton title="login">
                                    <LoginIcon sx={{ fontSize: "25px", color: "green" }} />
                                </IconButton>
                            </Link>
                            <Link to="/register" style={{ textDecoration: 'none' }}>
                                <Typography color="primary">Register</Typography>
                            </Link>
                        </>
                    )}
                </FlexBetween>
            ) : (
                <IconButton
                    onClick={() => setIsMobileMenu(!isMobileMenu)}
                >
                    <Menu />
                </IconButton>
            )}

            {/* MOBILE NAV */}
            {!isNonMobile && isMobileMenu && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10"
                    maxWidth="500px"
                    minWidth="300px"
                    backgroundColor={background}
                >
                    {/* CLOSE ICON */}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton
                            onClick={() => setIsMobileMenu(!isMobileMenu)}
                            title="close menu"
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    {/* MENU ITEMS */}
                    <FlexBetween
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="3rem"
                    >
                        {!isNonMobile && isMobileMenu && (
                            <Box>
                                <FlexBetween
                                    backgroundColor={neutralLight}
                                    borderRadius="9px"
                                    gap="3rem"
                                    padding="0.1rem 1.5rem"
                                >
                                    <InputBase placeholder="Search" />
                                    <IconButton>
                                        <Search />
                                    </IconButton>
                                </FlexBetween>
                                {/* Other toggle menu items */}
                            </Box>
                        )}
                        <IconButton
                            onClick={() => dispatch(authActions.setMode())}
                            sx={{ fontSize: "25px" }}
                            title="dark/light mode."
                        >
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightMode sx={{ color: dark, fontSize: "25px" }} />
                            )}
                        </IconButton>

                        <Message sx={{ fontSize: "25px" }} />
                        <Notifications sx={{ fontSize: "25px" }} />
                        <Help sx={{ fontSize: "25px" }} />
                        {/* add login or sign-up here with conditional render formcontrol */}
                        {user ? (
                            <>
                                <Typography color="primary" onClick={() => navigate("/profile")} >{fullName}</Typography>
                                <Typography style={{ textDecoration: 'none' }} onClick={() => dispatch(authActions.setLogout())} color="red">Logout</Typography>

                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <IconButton title="login">
                                        <LoginIcon sx={{ fontSize: "25px", color: "green" }} />
                                    </IconButton>
                                </Link>
                                <Link to="/register" style={{ textDecoration: 'none' }}>
                                    <Typography color="primary">Register</Typography>
                                </Link>
                            </>
                        )}
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    );
};

