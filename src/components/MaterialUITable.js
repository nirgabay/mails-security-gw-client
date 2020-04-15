import React, {useState} from "react";
import {useGlobalFilter, useRowSelect, useSortBy, useTable} from "react-table";
import InfiniteScroll from "react-infinite-scroller";
import MaUTable from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import {StyledTableCell} from "./StyledTableCell";
import Checkbox from "@material-ui/core/Checkbox";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {css} from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";
import {fetchMails, selectRows, unselectAllRows} from "../redux/actions";
import {getSelectedMailIds} from "../redux/reducers/mails";

const loaderCss = css`
        display: block;
        text-align: center;
        margin-top: 20px;
    `;

function MaterialUITable({columns, ...props}) {
    const {isFetching, mails, fetchMails, selectRows, selectedMailIds, unselectAllRows} = props;
    const [isSelectAll, setSelectAll] = useState(false);

    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        state: {sortBy, selectedRowIds}
    } = useTable(
        {
            columns,
            data: mails,
            initialState: {
                hiddenColumns: ['id']
            }
        },
        useSortBy,
        useRowSelect,
    );

    React.useEffect(() => {
        //TODO Implement Sort
        fetchMails();
    }, []);

    const handleRowClick = (id) => {
        selectRows([id]);
    };

    const handleSelectAllClick = () => {
        if (!rows || rows.length === 0) return;

        if (isSelectAll) {
            unselectAllRows();
        } else {
            selectRows(rows.map(row => parseInt(row.id)));
        }

        setSelectAll(!isSelectAll);
    };

    const loader = (
        <BeatLoader
            key={'loader'}
            css={loaderCss}
            loading={isFetching}
        >
        </BeatLoader>
    );

    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={() => fetchMails(rows.length)}
            hasMore={true}
            loader={loader}
            useWindow={false}
            initialLoad={false}
        >
            <MaUTable stickyHeader>
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            <StyledTableCell className={'selectAll'} padding="checkbox">
                                <Checkbox onChange={handleSelectAllClick} checked={isSelectAll}/>
                            </StyledTableCell>
                            {headerGroup.headers.map(column => (
                                <StyledTableCell
                                    {...(column.id === 'selection'
                                        ? column.getHeaderProps()
                                        : column.getHeaderProps(column.getSortByToggleProps()))}
                                >
                                    {column.render('Header')}
                                    {column.id !== 'selection' ? (
                                        <TableSortLabel
                                            active={column.isSorted}
                                            direction={column.isSortedDesc ? 'desc' : 'asc'}
                                        />
                                    ) : null}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        const isSelected = selectedMailIds.includes(row.values.id);
                        return (
                            <TableRow
                                key={i}
                                onClick={() => handleRowClick(i)}
                                role="checkbox"
                                hover
                                selected={isSelected}
                                {...row.getRowProps()}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox checked={isSelected}/>
                                </TableCell>
                                {row.cells.map(cell => {
                                    return (
                                        <TableCell {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </MaUTable>
        </InfiniteScroll>
    );
}

const mapStateToProps = state => ({
    isFetching: state.mails.isFetching,
    mails: state.mails.mails,
    selectedRows: state.mails.selectedRows,
    selectedMailIds: getSelectedMailIds(state),
});

const mapDispatchToProps = dispatch => {
    return {
        selectRows: bindActionCreators(selectRows, dispatch),
        unselectAllRows: bindActionCreators(unselectAllRows, dispatch),
        fetchMails: bindActionCreators(fetchMails, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MaterialUITable);
