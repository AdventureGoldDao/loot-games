import React,{useState} from 'react'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

export default function SnackMessage({isSnackbarOpen,msg,closeSnackbar,severity}) {
  const handleSnackbarClose = () => {
    closeSnackbar(false);
  };
  return (
    <Snackbar 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        >
        <Alert sx={{ width: '100%' }} severity={severity}>{msg}</Alert>
      </Snackbar>
  )
}
