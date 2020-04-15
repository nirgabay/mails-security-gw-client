import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {connect} from "react-redux";
import {getSelectedMailIds} from "../redux/reducers/mails";


function ConfirmationRequiredButton({isOpen, handleClose, button, dialogTitle, dialogText, dialogButtonText, confirmButtonColor, handleConfirm, ...props}) {
    const {selectedMailIds} = props;

    const onConfirm = () => {
      handleConfirm();
        handleClose();
    };

    return (
        <React.Fragment>
            {button}
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{dialogTitle} ({selectedMailIds.length} items)</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogText}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} variant="contained" color={confirmButtonColor || 'secondary'}>
                        {dialogButtonText}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    selectedMailIds: getSelectedMailIds(state),
});

export default connect(mapStateToProps, null)(ConfirmationRequiredButton);
