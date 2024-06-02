import React from 'react';
import NavBar from '../components/Navbar';
import buttonDarkTheme from '../config/themeButton'
import {
    Button,
    Container,
    ThemeProvider,
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Paper,
    Divider,
} from '@mui/material';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import { useNavigate } from 'react-router-dom';

// Dummy data for the 3D object
const dummyObject = {
    name: 'Dummy 3D Object',
    description: 'This is a placeholder for a 3D object.',
};

function HomePage() {
    const navigate = useNavigate();
    return (
        <>
            <NavBar title={'HOMEPAGE'} />

            <div className='AddNewProjectButtonContainer'>
                <ThemeProvider theme={buttonDarkTheme}>
                    <Button
                        onClick={() => { navigate('/addproject') }}
                        variant="contained"
                        disableElevation
                        startIcon={<AddHomeWorkIcon />}
                        color='primary'
                    >
                        Add Project
                    </Button>
                </ThemeProvider>
            </div>

            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                <Container maxWidth="xl" sx={{ mt: 4 }} key={index}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            My First Project
                        </Typography>
                        <Divider sx={{ my: 2, backgroundColor: buttonDarkTheme.palette.primary.dark, height: 1, mt: 2 }} />
                        <Box display="flex" justifyContent="space-between">
                            {/* Left side: 3D Object display */}
                            <Box width="50%" mr={2}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6">{dummyObject.name}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {dummyObject.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>

                            {/* Right side: Action buttons */}
                            <Box width="50%" ml={2}>
                                <Grid container spacing={2} direction="column">
                                    <Grid item>
                                        <ThemeProvider theme={buttonDarkTheme}>
                                            <Button variant="contained" fullWidth>
                                                On Site Data Entry
                                            </Button>
                                        </ThemeProvider>
                                    </Grid>
                                    <Grid item>
                                        <ThemeProvider theme={buttonDarkTheme}>
                                            <Button variant="contained" fullWidth>
                                                Schedule
                                            </Button>
                                        </ThemeProvider>
                                    </Grid>
                                    <Grid item>
                                        <ThemeProvider theme={buttonDarkTheme}>
                                            <Button variant="contained" fullWidth>
                                                Dashboard
                                            </Button>
                                        </ThemeProvider>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            ))}
        </>
    );
}

export default HomePage;
