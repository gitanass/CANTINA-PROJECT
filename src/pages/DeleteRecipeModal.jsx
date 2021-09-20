import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const DeleteRecipeModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setOpen(props.openModal);
  }, [props.openModal]);

  const handleClose = () => {
    setOpen(false);
    props.onCloseModal();
  };

  const onYesClick = () => {
    setOpen(false);
    props.onDeleteRecipeCallback();
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Delete Recipe"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to Delete Recipe ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onYesClick} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteRecipeModal;
