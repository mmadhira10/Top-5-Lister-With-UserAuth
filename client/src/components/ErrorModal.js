import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import AuthContext from '../auth'

export default function ErrorModal() {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const rootRef = React.useRef(null);
  const { auth } = useContext(AuthContext);

  function handleClose(event) 
  {
    event.preventDefault();
    auth.closeErrorModal();
  }

  return (
    <Modal
      open={auth.error ? true : false}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      > 
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Error:
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Alert severity="error">{auth.error}</Alert>
        </Typography>
        <Button onClick={handleClose}>Close</Button>
      </Box>
   </Modal>
  );
}