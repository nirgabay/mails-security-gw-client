import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Tooltip from '@material-ui/core/Tooltip'
import ClearIcon from "@material-ui/icons/Clear";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {deleteMail} from "../redux/actions";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        maxHeight: '40px'
    },
}));

const DeleteMailDialog = props => {
    const classes = useStyles();
    const { mails, selectedRow, deleteMail } = props;
    const [open, setOpen] = React.useState(false);
    const selectedMail = mails[selectedRow];

    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title="Delete Mail">
                <Button
                    variant="contained"
                    className={classes.margin}
                    startIcon={<ClearIcon />}
                    onClick={handleClickOpen}
                >
                    Delete
                </Button>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Delete Mail</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this mail?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => deleteMail(selectedRow, selectedMail.id)} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

const mapStateToProps = state => ({
    mails: state.mails.mails,
    selectedRow: state.mails.selectedRow
});

const mapDispatchToProps = dispatch => {
    return {
        deleteMail: bindActionCreators(deleteMail, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteMailDialog);
