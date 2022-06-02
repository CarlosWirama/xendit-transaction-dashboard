import getTransactionsResponseMock from "./getTransactionsResponseMock";

export function getTransactions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getTransactionsResponseMock);
    }, 1500);
  });
}
