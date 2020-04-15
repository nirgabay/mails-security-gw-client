import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles'
import {Button} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import GetAppIcon from '@material-ui/icons/GetApp';
import RefreshIcon from '@material-ui/icons/Refresh';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import StorageIcon from '@material-ui/icons/Storage';
import {deleteMails, refreshTable, setFilter, updateMails} from "../redux/actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getSelectedMailIds} from "../redux/reducers/mails";
import ConfirmationRequiredButton from "./ConfirmationRequiredButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        maxHeight: '40px'
    }
}));

function QuarantinedEmailsToolbar(props) {
    const classes = useStyles();
    const {quarantinedEmailsFilter, setFilter, refreshTable, deleteMails, updateMails, selectedMailIds} = props;

    const [isReleaseDialogOpen, setReleaseDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [status, setStatus] = useState('APPROVED');
    const [statusDisplayName, setStatusDisplayName] = useState('Approve');
    const [anchorEl, setAnchorEl] = React.useState(null);

    const isActionButtonsDisabled = selectedMailIds.length === 0;

    const deleteButton = (
        <Button
            variant="contained"
            className={classes.margin}
            startIcon={<ClearIcon />}
            disabled={isActionButtonsDisabled}
            onClick={() => setDeleteDialogOpen(true)}
        >
            Delete
        </Button>
    );

    const handleReleaseMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleReleaseActionClick = (action) => {
        if (action) {
            setStatus(action);
            setStatusDisplayName(action === 'APPROVED' ? 'Approve' : 'Reject')
            setReleaseDialogOpen(true);
        }

        setAnchorEl(null);
    };

    const updateStatusSelectBox = (
        <React.Fragment>
            <Button
                className={classes.margin}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleReleaseMenuClick}
                variant="contained"
                disabled={isActionButtonsDisabled}
                startIcon={<StorageIcon/>}
            >
                Release
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => handleReleaseActionClick()}
            >
                <MenuItem onClick={() => handleReleaseActionClick('APPROVED')}>Release</MenuItem>
                <MenuItem onClick={() => handleReleaseActionClick('REJECTED')}>Reject</MenuItem>
            </Menu>
        </React.Fragment>
    );

    const handleDelete = () => {
        deleteMails(selectedMailIds);
    };

    const handleUpdate = () => {
        updateMails(selectedMailIds, status);
    };

    return (
        <div className={'toolbar flex flex-justify-center'}>
            <ConfirmationRequiredButton
                isOpen={isReleaseDialogOpen}
                handleClose={() => setReleaseDialogOpen(false)}
                button={updateStatusSelectBox}
                dialogTitle={`${statusDisplayName} Mails`}
                dialogText={`Are you sure you want to ${statusDisplayName} the selected mails?`}
                dialogButtonText={statusDisplayName}
                handleConfirm={handleUpdate}
                confirmButtonColor={statusDisplayName === 'Approve' ? 'primary' : undefined}
            >
            </ConfirmationRequiredButton>

            <ConfirmationRequiredButton
                isOpen={isDeleteDialogOpen}
                handleClose={() => setDeleteDialogOpen(false)}
                button={deleteButton}
                dialogTitle={'Delete Mails'}
                dialogText={'Are you sure you want to delete the selected mails?'}
                dialogButtonText={'Delete'}
                handleConfirm={handleDelete}
            >
            </ConfirmationRequiredButton>

            <Button
                variant="contained"
                className={classes.margin}
                startIcon={<GetAppIcon/>}
                disabled
            >
                Download EML
            </Button>
            <Button
                variant="contained"
                className={classes.margin}
                startIcon={<RefreshIcon/>}
                onClick={() => refreshTable()}
            >
                Refresh
            </Button>

            <TextField
                className={classes.margin}
                id="input-with-icon-textfield"
                value={quarantinedEmailsFilter}
                variant="outlined"
                placeholder={"Search"}
                onChange={(e) => setFilter(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment className={'test'} position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
}

const mapStateToProps = state => ({
    quarantinedEmailsFilter: state.mails.filter,
    selectedMailIds: getSelectedMailIds(state),
});

const mapDispatchToProps = dispatch => {
    return {
        setFilter: bindActionCreators(setFilter, dispatch),
        refreshTable: bindActionCreators(refreshTable, dispatch),
        deleteMails: bindActionCreators(deleteMails, dispatch),
        updateMails: bindActionCreators(updateMails, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuarantinedEmailsToolbar);
