
import React, { useState } from 'react';

function Form({ addTransaction }) {
    const [formState, setFormState] = useState({
        name: '',
        amount: '',
        date: '',
        type: 'income',
    });

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTransaction(formState);
        setFormState({ name: '', amount: '', date: '', type: 'income' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Transaction Name"
                required
            />
            <input
                type="number"
                name="amount"
                value={formState.amount}
                onChange={handleChange}
                placeholder="Amount"
                required
            />
            <input
                type="date"
                name="date"
                value={formState.date}
                onChange={handleChange}
                required
            />
            <select name="type" value={formState.type} onChange={handleChange}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
            <button type="submit">Add Transaction</button>
        </form>
    );
}

export default Form;
