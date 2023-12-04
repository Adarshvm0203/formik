// ViewPage.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const View = ({ submittedData }) => {
  useEffect(() => {
    // when data is submitted data gets updated
    console.log('Submitted Data:', submittedData);
  }, [submittedData]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === 'passwordInput') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };
  

  const renderImageField = () => {
    if (!submittedData || !submittedData.imageInput) {
      return null;
    }
    return (
      <Box p={2} display="flex" justifyContent="center">
        <Typography variant="subtitle1">User Image</Typography>
        <img
          src={URL.createObjectURL(submittedData.imageInput)}
          alt="Form Image"
          style={{ maxWidth: '100%', maxHeight: '200px' }}
        />
      </Box>
    );
  };

  const renderOtherFields = () => {
    if (!submittedData) {
      return <Typography>No data posted</Typography>;
    }
    const itemsPerRow = 6;
    const numberOfRows = Math.ceil(Object.keys(submittedData).length / itemsPerRow);
    const otherFields = Object.entries(submittedData).filter(([key]) => key !== 'imageInput');

    return (
      <>
    
      <Box
      display="grid"
      gridTemplateColumns={`repeat(${itemsPerRow}, 1fr)`}
      gap={2}
      p={2}
    >
      {otherFields.map(([key, value], index) => (
        <Box key={key} p={2} boxShadow={1} borderRadius={8}>
          <Typography variant="subtitle1">{key}</Typography>
          {key === 'ADARSH' ? (
            <Typography>Hidden</Typography>
          ) : key === 'passwordInput' ? (
            <>
              <Typography>
                {showPassword ? value : '*******'}
              </Typography>
              <Button
                onClick={() => togglePasswordVisibility(key)}
                variant="outlined"
                size="small"
              >
                {showPassword ? 'Hide Password' : 'Show Password'}
              </Button>
            </>
          ) : key === 'confirmPassword' ? (
            <>
              <Typography>
                {showConfirmPassword ? value : '*******'}
              </Typography>
              <Button
                onClick={() => togglePasswordVisibility(key)}
                variant="outlined"
                size="small"
              >
                {showConfirmPassword ? 'Hide Confirm Password' : 'Show Confirm Password'}
              </Button>
            </>
          ) : key === 'checkboxInput' ? (
            <Typography>{value ? 'True' : 'False'}</Typography>
          ) : key === 'checkboxGroup' ? (
            <Typography>{value.join(', ')}</Typography>
          ) : (
            <Typography>{value}</Typography>
          )}
        </Box>
      ))}
    </Box>

    </>
    );
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <h2>Submitted Data</h2>
      {renderImageField()}
      {renderOtherFields()}
    </Box>
  );
};

export default View;