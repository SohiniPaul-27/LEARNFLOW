import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));



const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", signDisplay: "always" });

const list = document.getElementById("transactionList");
const form = document.getElementById("transactionForm");
const status = document.getElementById("status");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  transactions.push({
    id: transactions.length + 1,
    name: formData.get("name"),
    amount: parseFloat(formData.get("amount")),
    date: new Date(formData.get("date")),
    type: formData.get("type") === "on" ? "income" : "expense",
  });

  e.target.reset();
  saveAndRender();
});

function saveAndRender() {
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderList();
  updateTotal();
}

function updateTotal() {
  const totals = transactions.reduce((acc, trx) => {
    trx.type === "income" ? (acc.income += trx.amount) : (acc.expense += trx.amount);
    return acc;
  }, { income: 0, expense: 0 });

  const balanceTotal = totals.income - totals.expense;
  balance.textContent = formatter.format(balanceTotal).substring(1);
  income.textContent = formatter.format(totals.income);
  expense.textContent = formatter.format(totals.expense * -1);
}

function renderList() {
  list.innerHTML = transactions.length ? "" : (status.textContent = "No transactions.");
  transactions.forEach(({ id, name, amount, date, type }) => {
    list.insertAdjacentHTML("beforeend", `
      <li>
        <div class="name">
          <h4>${name}</h4>
          <p>${new Date(date).toLocaleDateString()}</p>
        </div>
        <div class="amount ${type}">
          <span>${formatter.format(amount * (type === "income" ? 1 : -1))}</span>
        </div>
        <div class="action">
        </div>
      </li>
    `);
  });
}

function deleteTransaction(id) {
  transactions.splice(transactions.findIndex(trx => trx.id === id), 1);
  saveAndRender();
}

saveAndRender();
