import React from 'react';
import { Box, Typography } from '@mui/material';

const NoDataOverlay = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Typography variant="h6">No Data</Typography>
    </Box>
  );
};

export default NoDataOverlay;
