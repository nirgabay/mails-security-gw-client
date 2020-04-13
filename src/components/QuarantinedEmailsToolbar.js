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
import PropTypes from 'prop-types';
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import DeleteMailDialog from "./DeleteMailDialog";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        maxHeight: '40px'
    },
}));


// const TableToolbar = props => {
//     // const classes = useToolbarStyles();
//
//     const {
//         numSelected,
//         addUserHandler,
//         deleteUserHandler,
//     } = props;
//
//     return (
//         <Toolbar
//             className={clsx(classes.root, {
//                 [classes.highlight]: numSelected > 0,
//             })}
//         >
//             <AddUserDialog addUserHandler={addUserHandler} />
//             {numSelected > 0 ? (
//                 <Typography
//                     className={classes.title}
//                     color="inherit"
//                     variant="subtitle1"
//                 >
//                     {numSelected} selected
//                 </Typography>
//             ) : (
//                 <Typography className={classes.title} variant="h6" id="tableTitle">
//                     Users
//                 </Typography>
//             )}
//
//             {/*{numSelected > 0 ? (*/}
//             {/*    <Tooltip title="Delete">*/}
//             {/*        <IconButton aria-label="delete" onClick={deleteUserHandler}>*/}
//             {/*            <DeleteIcon />*/}
//             {/*        </IconButton>*/}
//             {/*    </Tooltip>*/}
//             {/*) : (*/}
//             {/*    <GlobalFilter*/}
//             {/*        preGlobalFilteredRows={preGlobalFilteredRows}*/}
//             {/*        globalFilter={globalFilter}*/}
//             {/*        setGlobalFilter={setGlobalFilter}*/}
//             {/*    />*/}
//             {/*)}*/}
//         </Toolbar>
//     )
// };


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

            <DeleteMailDialog />

            <Button
                variant="contained"
                className={classes.margin}
                startIcon={<GetAppIcon />}
                disabled
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

QuarantinedEmailsToolbar.propTypes = {
    deleteUserHandler: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuarantinedEmailsToolbar);
