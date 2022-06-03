import { useState, useEffect } from "react";
import "./styles.css";
import Card from "../Card";
import Table from "../Table";
import ListView from "../ListView";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import TransactionCard from "./TransactionCard";
import columns from "./columnConfig";
import { getTransactions, getSummary } from "../../apis/transaction";

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  async function loadTransactions() {
    setIsLoading(true);
    try {
      const { data } = await getTransactions();
      setTransactions(data);
      setError("");
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadSummary() {
    setIsSummaryLoading(true);
    try {
      const { data } = await getSummary();
      setSummary(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSummaryLoading(false);
    }
  }

  useEffect(() => {
    loadTransactions();
    loadSummary();
  }, []);

  return (
    <div className="page-container">
      <div className="summary-container">
        <Card className="summary-card">
          <div className="summary-header">
            <ArrowDownwardIcon className="summary-arrow green" />
            <div className="summary-main-info">
              <div>Total Incoming Amount</div>
              {isSummaryLoading || !summary ? (
                <CircularProgress />
              ) : (
                <div className="summary-amount">
                  {summary.incoming.currency}
                  <span>{summary.incoming.amount.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
          <div className="summary-footer">
            <div>Transactions Number</div>
            {isSummaryLoading || !summary ? (
              <CircularProgress />
            ) : (
              <div className="count">{summary.incoming.count}</div>
            )}
          </div>
        </Card>
        <Card className="summary-card">
          <div className="summary-header">
            <ArrowUpwardIcon className="summary-arrow red" />
            <div className="summary-main-info">
              <div>Total Outgoing Amount</div>
              {isSummaryLoading || !summary ? (
                <CircularProgress />
              ) : (
                <div className="summary-amount">
                  {summary.outgoing.currency}
                  <span>{summary.outgoing.amount.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
          <div className="summary-footer">
            <div>Transactions Number</div>
            {isSummaryLoading || !summary ? (
              <CircularProgress />
            ) : (
              <div className="count">{summary.outgoing.count}</div>
            )}
          </div>
        </Card>
      </div>
      <ListView
        className="lg-hide"
        data={transactions}
        isLoading={isLoading}
        renderItem={TransactionCard}
        onReload={loadTransactions}
        error={error}
      />
      <Table
        className="lg-show"
        data={transactions}
        isLoading={isLoading}
        columns={columns}
        onReload={loadTransactions}
        error={error}
      />
    </div>
  );
}
