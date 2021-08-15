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
        {/* -------------- edit or add new------------------ */}
        <DialogContent>
          {props.edit ? (
            <Note
              edit={props.edit}
              setNotes={props.setNotes}
              item={props.item}
              collectBucketNames={props.collectBucketNames}
              bucket={props.bucket}
              setBucket={props.setBucket}
              handleClose={handleClose}
              setHideNote={props.setHideNote}
            />
          ) : (
            <Note
              notes={props.notes}
              bucket={props.bucket}
              setBucket={props.setBucket}
              collectBucketNames={props.collectBucketNames}
              setNotes={props.setNotes}
              handleClose={handleClose}
              setHideNote={props.setHideNote}
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
