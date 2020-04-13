import React from "react";
import {useRowSelect, useSortBy, useTable} from "react-table";
import InfiniteScroll from "react-infinite-scroller";
import MaUTable from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import {StyledTableCell} from "./StyledTableCell";
import Checkbox from "@material-ui/core/Checkbox";

const IndeterminateCheckbox = React.forwardRef(
    ({indeterminate, ...rest}, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <Checkbox ref={resolvedRef} {...rest} />
            </>
        )
    }
);

export default function MaterialUITable({columns, data, update, selectRow, selectedRow}) {
    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        state: {sortBy, selectedRowIds},
    } = useTable(
        {
            columns,
            data,
            initialState: {
                hiddenColumns: ['id']
            }
        },
        useSortBy,
        useRowSelect,
    );

    React.useEffect(() => {
        //TODO Implement Sort
    });

    const handleRowClick = (id) => {
        selectRow(id);
    };

    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={() => update(rows.length)}
            hasMore={true}
            loader={<h4>Loading more mails...</h4>}
            useWindow={false}
            initialLoad={false}
        >
            <MaUTable stickyHeader>
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            <StyledTableCell/>
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
                        const isSelected = selectedRow === i;
                        return (
                            <TableRow
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
