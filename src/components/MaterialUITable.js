import React from "react";
import {useRowSelect, useSortBy, useTable} from "react-table";
import InfiniteScroll from "react-infinite-scroller";
import MaUTable from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import {IndeterminateCheckbox} from "./IndeterminateCheckbox";
import {StyledTableCell} from "./StyledTableCell";

export default function MaterialUITable({columns, data, update}) {
    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow,
        state: {sortBy},
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
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({getToggleAllRowsSelectedProps}) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({row}) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        },
    );

    React.useEffect(() => {
        //TODO Implement Sort
    }, [sortBy]);

    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={() => update(rows.length)}
            hasMore={true}
            loader={<h4>Loading more mails...</h4>}
            useWindow={false}
            initialLoad={false}
        >
            <div>
                <MaUTable stickyHeader>
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
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
                            return (
                                <TableRow {...row.getRowProps()}>
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
            </div>
        </InfiniteScroll>
    );
}
