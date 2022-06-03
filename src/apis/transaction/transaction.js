import getTransactionsResponseMock from "./getTransactionsResponseMock";

export function getTransactions() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject("Placeholder error message");
      resolve(getTransactionsResponseMock);
    }, 1500);
  });
}
