import React, { useEffect, useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Paper, 
  Container, 
  Typography,
  Button,
  Grid 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DriveService } from '../services/driveService';

const WarrantyList = () => {
  const [warranties, setWarranties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWarranties = async () => {
      try {
        const response = await DriveService.getWarranties();
        setWarranties(response.warranties);
      } catch (error) {
        console.error('Error fetching warranties:', error);
      }
    };
    fetchWarranties();
  }, []);

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 3 }}>
        <Grid container justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">My Warranties</Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/editor')}
          >
            Add New Warranty
          </Button>
        </Grid>
        <List>
          {warranties.map((warranty) => (
            <ListItem key={warranty.id} button>
              <ListItemText 
                primary={warranty.title}
                secondary={`Expires: ${new Date(warranty.expiryDate).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default WarrantyList;