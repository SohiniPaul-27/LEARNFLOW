
import React from 'react';
import { Line } from 'react-chartjs-2';

function Graph({ transactions }) {
    const incomeData = transactions.filter(trx => trx.type === 'income').map(trx => trx.amount);
    const expenseData = transactions.filter(trx => trx.type === 'expense').map(trx => trx.amount);

    const data = {
        labels: transactions.map(trx => new Date(trx.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                borderColor: 'blue',
                fill: false,
            },
            {
                label: 'Expenses',
                data: expenseData,
                borderColor: 'red',
                fill: false,
            },
        ],
    };

    return <Line data={data} />;
}

export default Graph;
