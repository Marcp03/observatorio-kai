import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const Statistics = () => {
  const [barData, setBarData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [doughnutData, setDoughnutData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulamos llamada axios (reemplazar con URL real)
        const response = await axios.get("http://localhost:3000/statistics");
        // Simulamos estructura respuesta:
        // {
        //   bar: { labels: [...], data: [...] },
        //   line: { labels: [...], data: [...] },
        //   doughnut: { labels: [...], data: [...] }
        // }

        const { bar, line, doughnut } = response.data;

        setBarData({
          labels: bar.labels,
          datasets: [
            {
              label: "Muertes violentas",
              data: bar.data,
              backgroundColor: "#C81D73",
            },
          ],
        });

        setLineData({
          labels: line.labels,
          datasets: [
            {
              label: "Casos reportados por mes",
              data: line.data,
              borderColor: "#42D18C",
              fill: false,
              tension: 0.3,
            },
          ],
        });

        setDoughnutData({
          labels: doughnut.labels,
          datasets: [
            {
              label: "Tipo de población",
              data: doughnut.data,
              backgroundColor: ["#C81D73", "#005187", "#42D18C", "#757D88", "#B5EFE7"],
              borderWidth: 1,
            },
          ],
        });

        setSelectedYear(bar.labels[bar.labels.length - 1]); // Por defecto el último año
        setSelectedMonth(line.labels[0]); // Por defecto primer mes

        setLoading(false);
      } catch (error) {
        console.error("Error cargando datos:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center p-4">Cargando estadísticas...</p>;

  if (!barData || !lineData || !doughnutData)
    return <p className="text-center p-4">No hay datos disponibles</p>;

  // Filtrar barData por año seleccionado
  const filteredBarData = {
    labels: selectedYear ? [selectedYear] : barData.labels,
    datasets: barData.datasets.map((ds) => ({
      ...ds,
      data: selectedYear
        ? barData.labels.map((label, idx) => (label === selectedYear ? ds.data[idx] : 0))
        : ds.data,
    })),
  };

  // Para lineData: filtramos mes si quieres, pero aquí vamos a mostrar todos los meses
  // Si quieres un filtro por mes más complejo, dime.

  // Opciones para gráficos (añadimos títulos y responsividad)
  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Muertes violentas anuales" },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Casos reportados mensuales" },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      title: { display: true, text: "Distribución por tipo de población" },
    },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#C81D73]">
        Estadísticas del Observatorio KAI+
      </h2>

      {/* Filtro para muertes violentas */}
      <div className="mb-6 flex justify-center">
        <label htmlFor="year-select" className="mr-2 font-semibold">
          Filtrar por año:
        </label>
        <select
          id="year-select"
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#C81D73]"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Todos</option>
          {barData.labels.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section
          className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          role="region"
          aria-label="Gráfico de muertes violentas por año"
        >
          <h3 className="text-xl font-semibold mb-4 text-[#C81D73]">Muertes violentas por año</h3>
          <Bar data={filteredBarData} options={barOptions} />
        </section>

        <section
          className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          role="region"
          aria-label="Gráfico de casos reportados por mes"
        >
          <h3 className="text-xl font-semibold mb-4 text-[#42D18C]">Casos reportados por mes</h3>
          <Line data={lineData} options={lineOptions} />
        </section>

        <section
          className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 md:col-span-2"
          role="region"
          aria-label="Gráfico de distribución por población"
        >
          <h3 className="text-xl font-semibold mb-4 text-[#005187]">Distribución por tipo de población</h3>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </section>
      </div>
    </div>
  );
};

export default Statistics;
