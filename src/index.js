import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import "./styles.css";
import TransactionPage from "./components/TransactionPage";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TransactionPage />
    </LocalizationProvider>
  </StrictMode>
);
