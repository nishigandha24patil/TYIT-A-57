
import { useState } from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  // Calculate total expenses
  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Add a new expense
  function addExpense(e) {
    e.preventDefault();

    if (name.trim() === "" || Number(amount) <= 0) {
      alert("Please enter a name and a valid amount.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: name.trim(),
      amount: Number(amount),
      category: category,
      date: date,
    };

    setExpenses([...expenses, newExpense]);

    setName("");
    setAmount("");
    setCategory("Food");
    setDate(new Date().toISOString().slice(0, 10));
  }

  // Delete an expense
  function deleteExpense(id) {
    setExpenses(
      expenses.filter((expense) => expense.id !== id)
    );
  }

  // Calculate category-wise expenses
  const categories = ["Food", "Travel", "Shopping", "Other"];

  return (
    <div className="container">
      <header>
        <h1>My Expense Tracker</h1>
        <p>Record and analyze your daily expenses</p>
      </header>

      <div className="summary">
        <div className="summary-card">
          <h3>Total Expenses</h3>
          <h2>₹{total.toFixed(2)}</h2>
        </div>

        <div className="summary-card">
          <h3>Total Records</h3>
          <h2>{expenses.length}</h2>
        </div>
      </div>

      <section className="card">
        <h2>Add New Expense</h2>

        <form onSubmit={addExpense}>
          <label>Expense Name</label>
          <input
            type="text"
            placeholder="e.g. Lunch"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Amount (₹)</label>
          <input
            type="number"
            placeholder="Enter amount"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <button type="submit">Add Expense</button>
        </form>
      </section>

      <section className="card">
        <h2>Expense Analysis</h2>

        {categories.map((item) => {
          const categoryTotal = expenses
            .filter((expense) => expense.category === item)
            .reduce((sum, expense) => sum + expense.amount, 0);

          return (
            <div className="analysis-row" key={item}>
              <span>{item}</span>
              <strong>₹{categoryTotal.toFixed(2)}</strong>
            </div>
          );
        })}
      </section>

      <section className="card">
        <h2>Expense Records</h2>

        {expenses.length === 0 ? (
          <p className="empty">No expenses added yet.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.name}</td>
                    <td>₹{expense.amount.toFixed(2)}</td>
                    <td>{expense.category}</td>
                    <td>{expense.date}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteExpense(expense.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

    </div>
  );
}

export default App;