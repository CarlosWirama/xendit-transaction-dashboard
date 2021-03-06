import { useState } from "react";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import InputAdornment from "@mui/material/InputAdornment";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import SearchIcon from "@mui/icons-material/Search";

import { subMonths } from "date-fns";

import Card from "../Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TableMUI from "./TableMUI";
import { formatColumns } from "./utils";
import "./styles.css";

export default function Table({
  isLoading,
  data,
  rowPrimaryKey,
  columns,
  onReload,
  error,
  className = "",
  ...props
}) {
  const [startDate, setStartDate] = useState(subMonths(new Date(), 1));
  const [endDate, setEndDate] = useState(new Date());
  const formattedColumns = formatColumns(columns);
  return (
    <Card className={`table-container ${className}`} {...props}>
      <div className="filter-bar">
        <TextField variant="outlined" />
        <DesktopDatePicker
          inputFormat="dd MMM yyyy"
          value={startDate}
          onChange={setStartDate}
          maxDate={endDate}
          renderInput={(params) => <TextField {...params} />}
        />
        <span>-</span>
        <DesktopDatePicker
          inputFormat="dd MMM yyyy"
          value={endDate}
          onChange={setEndDate}
          minDate={startDate}
          maxDate={new Date()}
          renderInput={(params) => <TextField {...params} />}
        />
        <TextField
          variant="outlined"
          placeholder="Search by phone number or external ID"
          className="search-field"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <Button variant="contained" startIcon={<CloudDownloadOutlinedIcon />}>
          Export
        </Button>
      </div>
      <TableMUI
        rows={data}
        rowPrimaryKey={rowPrimaryKey}
        columns={formattedColumns}
        isLoading={isLoading}
        onReload={onReload}
        error={error}
      />
    </Card>
  );
}
