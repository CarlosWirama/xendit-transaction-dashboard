import getTransactionsResponseMock from "./getTransactionsResponseMock";
import getSummaryResponseMock from "./getSummaryResponseMock";

export function getTransactions() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject("Placeholder error message");
      resolve(getTransactionsResponseMock);
    }, 1500);
  });
}

export function getSummary() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject("Placeholder error message");
      resolve(getSummaryResponseMock);
    }, 1000);
  });
}
