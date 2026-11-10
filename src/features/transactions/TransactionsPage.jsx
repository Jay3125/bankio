import React, { useMemo, useState } from "react";
import Icon from "../../components/ui/Icon.jsx";
import PageTitleBar from "../../components/ui/PageTitleBar.jsx";
import StatCard from "../../components/ui/StatCard.jsx";
import transactions from "./data/transactions.js";

const monthNumbers = {
  January: "01",
  February: "02",
  March: "03",
};

// Formats an ISO date for the transaction list.
function formatDate(date) {
  return new Date(`${date}T00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Creates a small valid PDF receipt using standard PDF text and font objects.
function createTransactionPdf(transaction) {
  // Escapes PDF delimiters and replaces non-ASCII text for the built-in font.
  const escapeText = (value) =>
    String(value)
      .replace(/[^\x20-\x7e]/g, "?")
      .replace(/([\\()])/g, "\\$1");
  const lines = [
    `Date: ${transaction.date} ${transaction.time}`,
    `Description: ${transaction.description}`,
    `Account: ${transaction.account}`,
    `Category: ${transaction.category}`,
    `Amount: $${transaction.amount.toFixed(2)}`,
    `Status: ${transaction.status}`,
  ];
  const stream = [
    "BT",
    "/F1 18 Tf",
    "50 790 Td",
    "(Bankio Transaction Receipt) Tj",
    "/F1 11 Tf",
    ...lines.flatMap((line) => ["0 -28 Td", `(${escapeText(line)}) Tj`]),
    "ET",
  ].join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  pdf += offsets
    .slice(1)
    .map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`)
    .join("");
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Blob([pdf], { type: "application/pdf" });
}

// Creates a downloadable transaction file in the selected export format.
function exportTransaction(transaction, format) {
  // Quotes each CSV cell so commas and quotes in names remain valid CSV.
  const csvEscape = (value) => `"${String(value).replace(/"/g, '""')}"`;
  const fields = [
    transaction.date,
    transaction.description,
    transaction.account,
    transaction.category,
    transaction.amount,
    transaction.status,
  ];
  const blob =
    format === "CSV"
      ? new Blob(
          [
            "Date,Description,Account,Category,Amount,Status\n",
            fields.map(csvEscape).join(","),
          ],
          { type: "text/csv" },
        )
      : createTransactionPdf(transaction);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `transaction.${format.toLowerCase()}`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

// Filters, sorts, and displays transactions with per-row export actions.
export default function TransactionsPage({ initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState("date");
  const [flash, setFlash] = useState("");
  const [month, setMonth] = useState("February");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // Applies the selected month, status, category, query, and sort to transactions.
  const rows = useMemo(() => {
    const search = query.toLowerCase();
    const filtered = transactions.filter((transaction) =>
      transaction.date.slice(5, 7) === monthNumbers[month] &&
      (filterStatus === "all" || transaction.status === filterStatus) &&
      (filterCategory === "all" || transaction.category === filterCategory) &&
      [
          transaction.description,
          transaction.account,
          transaction.category,
          transaction.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search),
    );

    return [...filtered].sort((a, b) =>
      sort === "date"
        ? b.date.localeCompare(a.date)
        : b.amount - a.amount,
    );
  }, [query, sort, month, filterStatus, filterCategory]);

  // Exports a row and briefly announces the result to assistive technology.
  const handleExport = (transaction, format) => {
    exportTransaction(transaction, format);
    setFlash(`${format} exported for ${transaction.description}`);
    window.setTimeout(() => setFlash(""), 2000);
  };

  return (
    <>
      <PageTitleBar
        title="Transactions Activity Overview"
        placeholder="Find transactions"
        query={query}
        setQuery={setQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />
      <div className="g3">
        <StatCard
          label={<>Total<br />Income</>}
          value="$5,200.00"
          change="+8.5%"
        />
        <StatCard
          label={<>Total<br />Expenses</>}
          value="$3,750.90"
          change="-4.2%"
          isNegative
        />
        <div className="card nb">
          <span>
            Net Balance <small>(Income - Expenses)</small>
          </span>
          <span className="n">$3,800</span>
          <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
            Savings Rate
            <span className="rate">30.4% of total income</span>
          </span>
        </div>
      </div>
      <div
        style={{ display: "flex", alignItems: "flex-end", marginTop: 26 }}
        className="t"
      >
        <div style={{ flex: 1 }}>
          <h3>Recent Transfer Activity</h3>
          <p>
            Track all your income and expenses in one place, categorized for
            better financial insights.
          </p>
        </div>
        <select
          className="sel"
          aria-label="Month"
          value={month}
          onChange={(event) => setMonth(event.target.value)}
        >
          <option>January</option>
          <option>February</option>
          <option>March</option>
        </select>
      </div>
      <div className="scroll">
        <div className="th">
          <span>Date &amp; Time</span>
          <span>Description</span>
          <span>Account</span>
          <span>Category</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Export Data</span>
        </div>
        <div className="tb">
          {rows.length === 0 && (
            <div className="empty">
              No transactions match the selected search and filters.
            </div>
          )}
          {rows.map((transaction) => (
            <div className="tr" key={`${transaction.date}-${transaction.description}`}>
              <span>
                {formatDate(transaction.date)},<br />
                {transaction.time}
              </span>
              <span className="who">
                <span className="dot" style={{ background: transaction.color }}>
                  {transaction.initials}
                </span>
                <span>
                  <small>{transaction.type}</small>
                  {transaction.description}
                </span>
              </span>
              <span>{transaction.account.replace(" (", "\u00a0(")}</span>
              <span>{transaction.category}</span>
              <span>${transaction.amount.toFixed(2)}</span>
              <span className={transaction.status === "Failed" ? "fail" : "ok"}>
                {transaction.status}
              </span>
              <span className="exp">
                {["PDF", "CSV"].map((format) => (
                  <button
                    key={format}
                    onClick={() => handleExport(transaction, format)}
                  >
                    <span style={{ width: 11 }}>
                      <Icon name="dl" />
                    </span>
                    {format}
                  </button>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="foot">
        <button
          onClick={() => setSort(sort === "date" ? "amount" : "date")}
          aria-label={`Sort by ${sort === "date" ? "amount" : "date"}`}
        >
          <span style={{ width: 18 }}>
            <Icon name="sort" />
          </span>
          Sort by {sort === "date" ? "Date" : "Amount"}
        </button>
        <span style={{ flex: 1, fontSize: 13 }} role="status">
          {flash}
        </span>
      </div>
    </>
  );
}
