import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [draggedTo, setDraggedTo] = useState(0);
    const [ text, setText ] = useState("");

    function handleDragStart(event, targetId) {
        event.dataTransfer.setData("item", targetId);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        console.log("entering");
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        console.log("leaving");
        setDraggedTo(false);
    }

    function handleDrop(event, targetId) {
        event.preventDefault();
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        console.log("handleDrop (sourceId, targetId): ( " + sourceId + ", " + targetId + ")");

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsItemEditActive();
        }
        setEditActive(newActive);
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            handleBlur();
        }
    }

    function handleBlur(event)
    {
        store.addUpdateItemTransaction(index, text);
        toggleEdit();
    }

    function handleUpdateText(event) {
        setText(event.target.value );
    }

    let { index } = props;

    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }

    let itemCard =             
    <ListItem
        id={'item-' + (index+1)}
        key={props.key}
        className={itemClass}
        onDragStart={(event) => {
            handleDragStart(event, (index+1))
        }}
        onDragOver={(event) => {
            handleDragOver(event, (index+1))
        }}
        onDragEnter={(event) => {
            handleDragEnter(event, (index+1))
        }}
        onDragLeave={(event) => {
            handleDragLeave(event, (index+1))
        }}
        onDrop={(event) => {
            handleDrop(event, (index+1))
        }}
        draggable="true"
        sx={{ display: 'flex', p: 1 }}
        style={{
            fontSize: '48pt',
            width: '100%'
        }}
    >
    <Box sx={{ p: 1 }}>
        <IconButton onClick={handleToggleEdit}aria-label='edit'>
            <EditIcon style={{fontSize:'48pt'}}  />
        </IconButton>
    </Box>
        <Box sx={{ p: 1, flexGrow: 1 }}>{props.text}</Box>
    </ListItem>

    if (editActive) {
        itemCard =
        <TextField
            margin="normal"
            required
            fullWidth
            id={"list-" + index + 1}
            label="Top 5 List Name"
            name="name"
            autoComplete="Top 5 List Name"
            className='list-card'
            onKeyPress={handleKeyPress}
            onChange={handleUpdateText}
            defaultValue={props.text}
            inputProps={{style: {fontSize: 48}}}
            InputLabelProps={{style: {fontSize: 24}}}
            autoFocus
        />
    }

    return (
        itemCard
    )
}

export default Top5Item;