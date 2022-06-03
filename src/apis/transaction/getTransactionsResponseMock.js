export default {
  has_more: true,
  data: [
    {
      id: "txn_13dd178d-41fa-40b7-8fd3-f83675d6f413",
      product_id: "d290f1ee-6c54-4b01-90e6-d701748f0701",
      type: "PAYMENT",
      status: "SUCCESS",
      channel_category: "RETAIL_OUTLET",
      channel_code: "ALFAMART",
      reference_id: "ref23244",
      account_identifier: null,
      currency: "IDR",
      amount: 1000000,
      cashflow: "MONEY_IN",
      business_id: "5fc9f5b246f820517e38c84d",
      created: "2021-06-23T02:42:15.601Z",
      updated: "2021-06-23T02:42:15.601Z"
    },
    {
      id: "txn_a765a3f0-34c0-41ee-8686-bca11835ebdc",
      product_id: "d290f1ee-6c54-4b01-90e6-d701748f0700",
      type: "PAYMENT",
      status: "SUCCESS",
      channel_category: "RETAIL_OUTLET",
      channel_code: "ALFAMART",
      reference_id: "ref242424",
      account_identifier: null,
      currency: "IDR",
      amount: 930000,
      cashflow: "MONEY_IN",
      business_id: "5fc9f5b246f820517e38c84d",
      created: "2021-06-23T02:39:23.176Z",
      updated: "2021-06-23T02:39:23.176Z"
    }
  ],
  links: [
    {
      href:
        "/transactions?types=PAYMENT&statuses=SUCCESS&channel_categories=EWALLET&channel_categories=RETAIL_OUTLET&limit=2&after_id=txn_a765a3f0-34c0-41ee-8686-bca11835ebdc",
      method: "GET",
      rel: "next"
    }
  ]
};
