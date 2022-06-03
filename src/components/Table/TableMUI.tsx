import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import CircularProgress from "@mui/material/CircularProgress";
import { visuallyHidden } from "@mui/utils";
import { stableSort, getComparator, Order } from "./sortUtil";
import { Button } from "@mui/material";

interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ): Data {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein
//   };
// }

// const rows = [
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Donut", 452, 25.0, 51, 4.9),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
//   createData("Honeycomb", 408, 3.2, 87, 6.5),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Jelly Bean", 375, 0.0, 94, 0.0),
//   createData("KitKat", 518, 26.0, 65, 7.0),
//   createData("Lollipop", 392, 0.2, 98, 0.0),
//   createData("Marshmallow", 318, 0, 81, 2.0),
//   createData("Nougat", 360, 19.0, 9, 37.0),
//   createData("Oreo", 437, 18.0, 63, 4.0)
// ];

// interface column {
//   id: keyof Data;
//   label: string;
// }

// const columns: readonly column[] = [
//   {
//     id: "name",
//     label: "Dessert (100g serving)"
//   },
//   {
//     id: "calories",
//     label: "Calories"
//   },
//   {
//     id: "fat",
//     label: "Fat (g)"
//   },
//   {
//     id: "carbs",
//     label: "Carbs (g)"
//   },
//   {
//     id: "protein",
//     label: "Protein (g)"
//   }
// ];

interface Column {
  name: string;
  label: string;
  align: "right" | "left" | "center" | "justify";
  render?: (value: any) => React.ReactNode;
}

interface EnhancedTableHeadProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
  columns: Column[];
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const { order, orderBy, onRequestSort, columns } = props;
  const createSortHandler = (property: string) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.name}
            align="left"
            padding="normal"
            sortDirection={orderBy === column.name ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.name}
              direction={orderBy === column.name ? order : "asc"}
              onClick={createSortHandler(column.name)}
              className="table-header-cell"
            >
              {column.label}
              {orderBy === column.name ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableProps {
  rows: Array<any>;
  rowPrimaryKey: string;
  columns: Column[];
  isLoading: boolean;
  error: string;
  onReload: () => void;
}
export default function EnhancedTable({
  rows,
  rowPrimaryKey,
  columns,
  isLoading,
  error,
  onReload
}: EnhancedTableProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>(rowPrimaryKey);
  const [selected, setSelected] = React.useState<string | number | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (id: string | number) => {
    setSelected(selected === id ? null : id);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);

  return (
    <>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <caption className="invisible">Transaction</caption>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            columns={columns}
          />

          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
            {isLoading ? (
              <TableCell className="loading-container" colSpan={columns.length}>
                <CircularProgress />
              </TableCell>
            ) : error ? (
              <TableCell className="loading-container" colSpan={columns.length}>
                Something wrong happened: {error}
                <br />
                <Button onClick={onReload} variant="contained">
                  Reload
                </Button>
              </TableCell>
            ) : (
              stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = selected === row[rowPrimaryKey];
                  return (
                    <TableRow
                      hover
                      onClick={() => handleClick(row[rowPrimaryKey])}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row[rowPrimaryKey]}
                      selected={isItemSelected}
                    >
                      {columns.map(({ name, render, align }) => (
                        <TableCell
                          align={align}
                          key={name}
                          className="table-data-cell"
                        >
                          {render ? render(row[name]) : row[name]}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={columns.length} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
