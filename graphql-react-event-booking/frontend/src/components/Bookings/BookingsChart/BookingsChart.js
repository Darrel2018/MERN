import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BOOKINGS_BUCKETS = {
    Cheap: {
        min: 0,
        max: 100
    },
    Normal: {
        min: 100,
        max: 200
    },
    Expensive: {
        min: 200,
        max: 10000000
    }
};

const BookingsChart = props => {
    const labels = [];
    const values = [];

    for (const bucket in BOOKINGS_BUCKETS) {
        const filteredBookingsCount = props.bookings.reduce((prev, current) => {
            if (
                current.event.price > BOOKINGS_BUCKETS[bucket].min &&
                current.event.price < BOOKINGS_BUCKETS[bucket].max
            ) {
                return prev + 1;
            }

            return prev;
        }, 0);

        labels.push(bucket);
        values.push(filteredBookingsCount);
    }

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Bookings',
                data: values,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ]
            }
        ]
    };

    return (
        <div
            style={{
                width: '500px',
                height: '300px',
                margin: '0 auto'
            }}
        >
            <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
    );
};

export default BookingsChart;