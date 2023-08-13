import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function TimeKeeperV2(props) {
  return (
    <Box sx={{ position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', }}>
      <CircularProgress 
        variant="determinate" 
        value={props.value} 
        size={100}
        thickness={7}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}