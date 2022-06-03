import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import Card from "../Card";
import "./styles.css";

export default function ListView({
  isLoading,
  data,
  rowPrimaryKey,
  renderItem: RenderItem,
  onReload,
  error,
  className = "",
  ...props
}) {
  // TODO: filtering
  // const [startDate, setStartDate] = useState(subMonths(new Date(), 1));
  // const [endDate, setEndDate] = useState(new Date());
  return (
    <div className={`table-container ${className}`} {...props}>
      <Card className="filter-bar">
        <TextField
          variant="outlined"
          placeholder="Search"
          className="search-field"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <IconButton aria-label="export to CSV">
          <CloudDownloadOutlinedIcon />
        </IconButton>
        <IconButton aria-label="filter">
          <FilterAltOutlinedIcon />
        </IconButton>
      </Card>
      {isLoading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : error ? (
        <div className="loading-container">
          Something wrong happened: {error}
          <br />
          <Button onClick={onReload} variant="contained">
            Reload
          </Button>
        </div>
      ) : (
        data.map((item) => <RenderItem key={item[rowPrimaryKey]} data={item} />)
      )}
    </div>
  );
}
