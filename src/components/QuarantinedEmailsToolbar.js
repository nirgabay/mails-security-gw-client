import React from "react";
import { makeStyles } from '@material-ui/core/styles'
import {Button} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import RefreshIcon from '@material-ui/icons/Refresh';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import {setFilter} from "../redux/actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        maxHeight: '40px'
    },
}));

function QuarantinedEmailsToolbar(props) {
    const classes = useStyles();

    return (
        <div className={'toolbar flex flex-justify-center'}>
            <Button
                variant="contained"
                className={classes.margin}
                startIcon={<DeleteIcon />}
            >
                Release
            </Button>
            <Button
                variant="contained"
                className={classes.margin}
                startIcon={<ClearIcon />}
            >
                Delete
            </Button>
            <Button
                variant="contained"
                className={classes.margin}
                startIcon={<GetAppIcon />}
            >
                Download EML
            </Button>
            <Button
                variant="contained"
                className={classes.margin}
                startIcon={<RefreshIcon />}
            >
                Refresh
            </Button>

            <TextField
                className={classes.margin}
                id="input-with-icon-textfield"
                value={props.quarantinedEmailsFilter}
                variant="outlined"
                placeholder={"Search"}
                onChange={(e) => props.setFilter(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
}

const mapStateToProps = state => ({
    quarantinedEmailsFilter: state.quarantinedEmailsFilter,
});

const mapDispatchToProps = dispatch => {
    return {
        setFilter: bindActionCreators(setFilter, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuarantinedEmailsToolbar);
