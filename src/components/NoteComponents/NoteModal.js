import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import Note from "./Note";

export default function NoteModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<NoteAddIcon />}
        onClick={handleClickOpen}
      >
        {props.edit ? "Edit Note" : " Add Note "}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Note Details</DialogTitle>
        <DialogContent>
          {props.edit ? (
            <Note
              edit={props.edit}
              setNotes={props.setNotes}
              index={props.index}
              item={props.item}
              handleClose={handleClose}
            />
          ) : (
            <Note
              notes={props.notes}
              setNotes={props.setNotes}
              handleClose={handleClose}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
