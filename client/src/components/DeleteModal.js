import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

export default function DeleteModal() {
  const { store } = useContext(GlobalStoreContext);
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

  let name = ""
  let bool = false
  if (store.listMarkedForDeletion)
  {
      name = store.listMarkedForDeletion.name;
      bool = true
  }

  function handleDeleteList(event) {
    store.deleteMarkedList();
    store.unmarkListForDeletion();
  }

  function handleCloseModal(event) {
    store.unmarkListForDeletion();
  }

  return (
    <div>
      <Modal
        open={bool}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete the {name} Top 5 List?
          </Typography>
          <Button
            id="dialog-yes-button"
            className="modal-button"
            onClick={handleDeleteList}
            >Confirm</Button>
          <Button
          id="dialog-no-button"
          className="modal-button"
          onClick={handleCloseModal}
          >Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}