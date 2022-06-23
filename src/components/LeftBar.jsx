import { Box } from '@mui/system';
import * as React from 'react';
import { Button, Stack } from '@mui/material';
import styled from '@emotion/styled';
import TableBarIcon from '@mui/icons-material/TableBar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { theme } from '../styles/styles';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const options = [
    { name: "Mis reservas", link: "mis-reservas", icon: <TableBarIcon /> },
    { name: "Mi Perfil", link: "#", icon: <AccountBoxIcon /> }
]

const MyButton = styled(Button)(({ theme }) => ({
    marginTop: 4,
    width: '100%',
    height: 50,
}));

const MyNavLink = styled(NavLink)({
    textDecoration: 'none',
});

class LeftBar extends React.Component {
    render() {
        return (

            <Box sx={{ width: "17vw", backgroundColor: 'whitesmoke', paddingTop: 5 }}>
                <Stack>
                    <ThemeProvider theme={theme}>
                        {options.map(op => {
                            return (
                                <MyNavLink to={op.link} key={op.name}>
                                    <MyButton
                                        sx={{
                                            display: {
                                                tablet: 'none',
                                                mobile: 'none',
                                                laptop: 'flex'
                                            },
                                            justifyContent: 'left',
                                            paddingLeft: 4
                                        }}
                                        variant="text"
                                        startIcon={op.icon}
                                        size="large"
                                    >{op.name}</MyButton>
                                </MyNavLink>
                            );
                        })}
                        {options.map(op => {
                            return (
                                <MyNavLink to={op.link} key={op.name}>
                                    <MyButton
                                        sx={{
                                            display: {
                                                tablet: 'block',
                                                laptop: 'none'
                                            }
                                        }}
                                        variant="text"
                                        startIcon={op.icon}
                                        size="large"
                                    ></MyButton>
                                </MyNavLink>
                            );
                        })}
                    </ThemeProvider>
                </Stack>
            </Box>
        );
    }
}

export default LeftBar;