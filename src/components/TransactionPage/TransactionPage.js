import { useState, useEffect } from "react";
import "./styles.css";
import Card from "../Card";
import Table from "../Table";
import columns from "./columnConfig";
import { getTransactions } from "../../apis/transaction";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTransactions().then(({ data, links, has_more: hasMore }) => {
      setIsLoading(false);
      setTransactions(data);
    });
  }, []);

  return (
    <div className="page-container">
      <div className="summary-container">
        <Card>Total Incoming Amount</Card>
        <Card>Total Outgoing Amount</Card>
      </div>
      <Table
        // className="lg-show"
        data={transactions}
        isLoading={isLoading}
        columns={columns}
      />
    </div>
  );
}
