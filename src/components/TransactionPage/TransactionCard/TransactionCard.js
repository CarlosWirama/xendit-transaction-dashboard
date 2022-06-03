import { format } from "date-fns";
import Card from "../../Card";
import { CHANNEL } from "../enums";
import "./styles.css";

export default function TransactionCard({ data }) {
  const {
    type,
    channel_category,
    channel_code: code,
    cashflow,
    currency,
    amount,
    updated
  } = data;
  const channelLogo =
    code === "OVO" ? (
      <img src="/assets/logo/ovo.png" alt={code} />
    ) : (
      <div style={{ backgroud: "red" }}>{code}</div>
    );
  const isMoneyIn = cashflow === "MONEY_IN";
  const cashflowSign = isMoneyIn ? "+" : "-";
  return (
    <Card className="transaction-card">
      <div className="header-row">
        {type}, {CHANNEL[channel_category]}{" "}
        <span className="channel-logo">{channelLogo}</span>
      </div>
      <div className="amount-row">
        {currency}{" "}
        <span className={isMoneyIn ? "green" : "red"}>
          {cashflowSign}
          {amount.toLocaleString()}
        </span>
      </div>
      <div className="footer-row">
        {format(new Date(updated), "dd MMM yyyy, h:mm a")}
      </div>
    </Card>
  );
}
