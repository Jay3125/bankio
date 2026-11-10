import transactions from "./data/transactions.js";

// Returns sample transactions matching the query across common transaction fields.
export default function searchTransactions(query) {
  const search = query.trim().toLowerCase();
  if (!search) return [];

  return transactions.filter((transaction) =>
    [
      transaction.description,
      transaction.account,
      transaction.category,
      transaction.status,
      transaction.type,
      transaction.date,
      transaction.amount.toFixed(2),
    ]
      .join(" ")
      .toLowerCase()
      .includes(search),
  );
}
