import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  Snackbar,
  Alert,
  Link,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Papa from 'papaparse';

const modelFields = [
  { name: 'Structure Model Data (CSV)', isRequired: true, templateUrl: '/path/to/structure-template.csv' },
  { name: 'Architecture Model Data (CSV)', isRequired: false, templateUrl: '/path/to/architecture-template.csv' },
  { name: 'Mechanical Model Data (CSV)', isRequired: false, templateUrl: '/path/to/mechanical-template.csv' },
  { name: 'Electrical Model Data (CSV)', isRequired: false, templateUrl: '/path/to/electrical-template.csv' },
  { name: 'Plumbing Model Data (CSV)', isRequired: false, templateUrl: '/path/to/plumbing-template.csv' },
];

function AddProject() {
  const [projectName, setProjectName] = useState('');
  const [modelFile, setModelFile] = useState(null);
  const [modelDataFiles, setModelDataFiles] = useState({});
  const [csvData, setCsvData] = useState({});
  const [openToast, setOpenToast] = useState(false);

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleModelFileChange = (event) => {
    const file = event.target.files[0];
    setModelFile(file);
  };

  const handleModelDataFileChange = (event, modelName) => {
    const file = event.target.files[0];
    setModelDataFiles((prevFiles) => ({
      ...prevFiles,
      [modelName]: file,
    }));

    // Parse the CSV file and update csvData state
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setCsvData((prevData) => ({
          ...prevData,
          [modelName]: results.data,
        }));
      },
    });
  };

  const handleSubmit = () => {
    // Implement your submit logic here, e.g., submit to server
    console.log('Project Name:', projectName);
    console.log('Model File:', modelFile);
    console.log('Model Data Files:', modelDataFiles);
    console.log('CSV Data:', csvData['Structure Model Data (CSV)']);

    // Reset the form
    // setProjectName('');
    // setModelFile(null);
    // setModelDataFiles({});
    // setCsvData({});

    // // Show toast
    // setOpenToast(true);

    // // Close toast after 2 seconds
    // setTimeout(() => {
    //   setOpenToast(false);
    // }, 2000);
  };

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  return (
    <>
      <NavBar title={'ADD PROJECT'} />
      <Box sx={{ display: 'flex', mt: 8 }}>
        <Box
          sx={{
            width: '20%',
            position: 'fixed',
            left: 0,
            top: 69, // Adjust the top value to match the height of your navbar
            bottom: 0,
            backgroundColor: '#1E293B',
            color: 'white',
            p: 2,
            borderRight: '1px solid #ccc',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Download Templates
          </Typography>
          {modelFields.map((field) => (
            <Box mb={2} key={field.name} sx={{ border: '1px solid #ccc', borderRadius: '4px', '& > a': { textDecoration: 'none' } }}>
              <Link href={field.templateUrl} download color="inherit">
                {`Download ${field.name.replace(' (CSV)', '')} Template`}
              </Link>
            </Box>
          ))}
        </Box>
        <Box sx={{ width: '80%', marginLeft: '20%' }}>
          <Container maxWidth="md" sx={{ maxHeight: 'calc(100vh - 100px)' }}>
            <Typography variant="h4" gutterBottom>
              Add New Project
            </Typography>
            <Box sx={{ mt: 2 }}>
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
                      <span style={{ color: 'red' }}> *</span>
                    </Typography>
                  </Button>
                </label>
              </FormControl>
            </Box>
            {modelFields.map((field) => (
              <Box sx={{ mt: 3 }} key={field.name}>
                <FormControl fullWidth required={field.isRequired}>
                  <input
                    type="file"
                    id={field.name}
                    accept=".csv"
                    onChange={(event) => handleModelDataFileChange(event, field.name)}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor={field.name}>
                    <Button
                      variant="outlined"
                      component="span"
                      fullWidth
                      startIcon={<CloudUploadIcon />}
                    >
                      <Typography>
                        {modelDataFiles[field.name] ? modelDataFiles[field.name].name : `Upload ${field.name}`}
                        {field.isRequired && <span style={{ color: 'red' }}> *</span>}
                      </Typography>
                    </Button>
                  </label>
                </FormControl>
              </Box>
            ))}
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={false}
              >
                Add New Project
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>

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
