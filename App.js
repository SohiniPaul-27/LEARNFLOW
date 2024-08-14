
import React, { useState } from 'react';
import Form from './components/Form';
import Graph from './components/Graph';

function App() {
    const [transactions, setTransactions] = useState([]);

    const addTransaction = (transaction) => {
        setTransactions([...transactions, { ...transaction, amount: parseFloat(transaction.amount), id: transactions.length + 1 }]);
    };

    return (
        <div>
            <h1>Budget Buddy</h1>
            <Form addTransaction={addTransaction} />
            <Graph transactions={transactions} />
        </div>
    );
}

export default App;
