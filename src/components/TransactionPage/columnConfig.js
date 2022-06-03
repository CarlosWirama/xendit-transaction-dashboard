import { format } from "date-fns";
import { CHANNEL, TRANSACTION_TYPE } from "./enums";

export default [
  { name: "status", render: (status) => status },
  { name: "type", render: (type) => <div>{TRANSACTION_TYPE[type]}</div> },
  {
    name: "channel_category",
    label: "channel",
    render: (channel) => <div>{CHANNEL[channel]}</div>
  },
  {
    name: "channel_code",
    label: "",
    render: (code) => <div style={{ background: "red" }}>{code}</div>
  },
  { name: "business_id", label: "account" },
  { name: "cashflow", label: "", render: (cashflow) => cashflow },
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
