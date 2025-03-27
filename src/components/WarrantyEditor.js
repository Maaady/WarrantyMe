import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { 
  Button, 
  TextField, 
  Box, 
  Container, 
  Paper, 
  Snackbar,
  Grid,
  Typography 
} from '@mui/material';
import { DriveService } from '../services/driveService';

const WarrantyEditor = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [productName, setProductName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleSave = async () => {
    try {
      await DriveService.saveWarranty(content, title, expiryDate, { productName });
      setSnackbar({ open: true, message: 'Warranty saved successfully!' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to save warranty' });
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>Add New Warranty</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Warranty Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Expiry Date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mt: 2, mb: 2 }}>
              <ReactQuill
                value={content}
                onChange={setContent}
                theme="snow"
                style={{ height: '300px', marginBottom: '50px' }}
              />
            </Box>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mt: 2 }}
        >
          Save Warranty
        </Button>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
};

export default WarrantyEditor;