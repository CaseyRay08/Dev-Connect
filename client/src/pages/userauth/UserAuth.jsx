import { Box, useMediaQuery, useTheme, Typography } from "@mui/material"
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import { Link } from "react-router-dom"


const UserAuth = ({ isLoggingIn }) => {

    const theme = useTheme();
    const isNonMobile = useMediaQuery("(min-width: 1039px)");

    return (
        <Box>
            <Box
                width="100%"
                backgroundColor={theme.palette.background.alt}
                p="1rem 6%"
                textAlign="center"
            >
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Typography
                        fontWeight="bold"
                        fontSize="32px"
                        color="primary"
                    >
                        Dev-Connect
                    </Typography>
                </Link>
            </Box>
            <Box
                width={isNonMobile ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
                textAlign="center"
            >
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                    {isLoggingIn === true ? "Please login to your Dev-Connect profile!" : "Register an account & join our community! "}
                </Typography>
                {isLoggingIn ? (
                    <LoginForm />
                ) : (
                    <RegisterForm />
                )}
            </Box>
        </Box >
    )
}

export default UserAuth