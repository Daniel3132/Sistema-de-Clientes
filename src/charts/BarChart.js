import React, { useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const options = {
    fill: true,
    animations: true,
    responsive: true,
    plugins: {
        legend: {
            display: true,
        },
    },
    scales: {
        y: {
            min: 1900
        },
    }
};

export default function BarChart({ Clientes = [{}] }) {

    const data = useMemo(function () {

        const labels = Clientes.map(c => c.nombre);
        const scores = Clientes.map(c => parseInt(c.fecha))

        return {
            datasets: [
                {
                    label: "Año nacimiento",
                    tension: 0.3,
                    data: scores,
                    borderColor: "green",
                    backgroundColor: "rgba(0, 255, 0, 0.5)",
                },
            ],
            labels,
        };
    }, [Clientes]);

    return (
        <div className="App">
            <Bar data={data} options={options} />
        </div>
    );
}