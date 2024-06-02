import React from 'react'
import {
    Button,
    Container,
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Paper,
    Divider,
  } from '@mui/material';
  
  // Dummy data for the 3D object
  const dummyObject = {
    name: 'Dummy 3D Object',
    description: 'This is a placeholder for a 3D object.',
  };

function ProjectListItem() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        My First Project
      </Typography>
      <Divider sx={{ my: 2, backgroundColor: darkTheme.palette.primary.dark, height: 1, mt: 2 }} />
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
              <Button variant="contained" fullWidth>
                On Site Data Entry
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" fullWidth>
                Schedule
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" fullWidth>
                Dashboard
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  </Container>
  )
}

export default ProjectListItem