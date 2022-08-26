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
            min: 0
        },
    }
};

export default function ChartEdad({ Clientes = [{}] }) {

    const data = useMemo(function () {

        const labels = Clientes.map(c => c.nombre);

        const d = new Date();
        let year = d.getFullYear();
        const edades = Clientes.map(c => year - parseInt(c.fecha))

        return {
            datasets: [
                {
                    label: "Edad",
                    tension: 0.3,
                    data: edades,
                    borderColor: "blue",
                    backgroundColor: "rgba(0, 155, 100, 0.5)",
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