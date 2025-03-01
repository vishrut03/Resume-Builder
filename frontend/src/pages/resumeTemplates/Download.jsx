import React from 'react';
import { Box, Button } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ToastTheme from '../../utils/ToastTheme';
import { toast } from "react-toastify";

const Download = ({ handleDownload }) => {

  const handleCopyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard',ToastTheme);
  };

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" mt={1} mb={2}>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleCopyToClipboard} 
        style={{ marginRight: '10px'}}
      >
      <ContentCopyIcon />
      </Button>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleDownload} 
        style={{ marginRight: '10px' }}
        
      >
      <DownloadForOfflineIcon />
      </Button>
    </Box>
  );
};

export default Download;
