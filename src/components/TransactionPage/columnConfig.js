import { format } from "date-fns";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { CHANNEL } from "./enums";

export default [
  {
    name: "status",
    render: (status) =>
      status === "Settled" ? (
        <Chip icon={<CheckIcon />} label={status} className="bg-green" />
      ) : status === "Pending" ? (
        <Chip
          icon={<HourglassTopIcon />}
          label={status}
          className="bg-yellow"
        />
      ) : (
        <Chip icon={<CloseIcon />} label={status} className="bg-red" />
      )
  },
  "type",
  {
    name: "channel_category",
    label: "channel",
    render: (channel) => <div>{CHANNEL[channel]}</div>
  },
  {
    name: "channel_code",
    label: "",
    render: (code) =>
      code === "OVO" ? (
        <img src="/assets/logo/ovo.png" alt={code} />
      ) : (
        <div style={{ background: "red" }}>{code}</div>
      )
  },
  { name: "business_id", label: "account" },
  {
    name: "cashflow",
    label: "",
    render: (cashflow) =>
      cashflow === "MONEY_IN" ? (
        <ArrowDownwardIcon className="green" />
      ) : (
        <ArrowUpwardIcon className="red" />
      )
  },
  { name: "currency", label: "" },
  { name: "amount", align: "right", render: (num) => num.toLocaleString() },
  { name: "reference_id", label: "reference" },
  {
    name: "updated",
    label: "date updated",
    render: (date) => format(new Date(date), "dd MMM yyyy, h:mm a")
  }
  // { name: '', label: '', render: ThreeDotsMenu}
];
