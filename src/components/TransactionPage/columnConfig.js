export default [
  { name: "status" },
  "type",
  { name: "channel_category", label: "channel", render: () => {} },
  { name: "business_id", label: "account" },
  { name: "channel_code", label: "", render: () => {} },
  { name: "cashflow", label: "", render: () => {} },
  { name: "currency", label: "" },
  { name: "amount", render: (num) => num.toLocaleString() },
  { name: "reference_id", label: "reference" },
  {
    name: "updated",
    label: "date updated",
    render: (date) => new Date(date).toLocaleDateString()
  }
  // { name: '', label: '', render: ThreeDotsMenu}
];
