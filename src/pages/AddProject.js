import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  FormHelperText,
  Snackbar,
  Alert,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function AddProject() {
  const [projectName, setProjectName] = useState('');
  const [modelFile, setModelFile] = useState(null);
  const [modelDataFile, setModelDataFile] = useState(null);
  const [openToast, setOpenToast] = useState(false);

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleModelFileChange = (event) => {
    const file = event.target.files[0];
    setModelFile(file);
  };

  const handleModelDataFileChange = (event) => {
    const file = event.target.files[0];
    setModelDataFile(file);
  };

  const handleSubmit = () => {
    // Implement your submit logic here, e.g., submit to server
    console.log('Project Name:', projectName);
    console.log('Model File:', modelFile);
    console.log('Model Data File:', modelDataFile);

    // Reset the form
    setProjectName('');
    setModelFile(null);
    setModelDataFile(null);

    // Show toast
    setOpenToast(true);

    // Close toast after 2 seconds
    setTimeout(() => {
      setOpenToast(false);
    }, 2000);
  };

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  return (
    <>
      <NavBar title={'ADD PROJECT'}/>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Add New Project
        </Typography>
        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            required
            id="project-name"
            label="Project Name"
            variant="outlined"
            value={projectName}
            onChange={handleProjectNameChange}
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <FormControl fullWidth required>
            <input
              type="file"
              id="model-file"
              accept=".gltf,.glb"
              onChange={handleModelFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="model-file">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                startIcon={<CloudUploadIcon />}
              >
                <Typography>
                  {modelFile ? modelFile.name : 'Upload 3D Model (GLTF)'}
                </Typography>
              </Button>
            </label>
            <FormHelperText>
              Upload warning: Files must be in GLTF format.
            </FormHelperText>
          </FormControl>
        </Box>
        <Box sx={{ mt: 3 }}>
          <FormControl fullWidth required>
            <input
              type="file"
              id="model-data-file"
              accept=".csv"
              onChange={handleModelDataFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="model-data-file">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                startIcon={<CloudUploadIcon />}
              >
                <Typography>
                  {modelDataFile ? modelDataFile.name : 'Upload Model Data (CSV)'}
                </Typography>
              </Button>
            </label>
            <FormHelperText>
              Upload warning: Files must be in CSV format.
            </FormHelperText>
          </FormControl>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!projectName || !modelFile || !modelDataFile}
          >
            Submit
          </Button>
        </Box>
      </Container>

      <Snackbar
        open={openToast}
        autoHideDuration={2000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={handleToastClose}>
          Project submitted successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddProject;
