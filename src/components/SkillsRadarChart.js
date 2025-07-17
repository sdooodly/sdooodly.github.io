import React, { useState } from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { skills } from '../data/skills';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const categories = Object.keys(skills);

const categoryColors = {
  Frontend: 'rgba(0,224,255,0.5)',
  Backend: 'rgba(255,45,149,0.5)',
  DevOps: 'rgba(182,255,45,0.5)',
  Other: 'rgba(255,255,255,0.3)',
};

const SkillsRadarChart = () => {
  const [selected, setSelected] = useState(categories[0]);
  const data = {
    labels: skills[selected].map(s => s.name),
    datasets: [
      {
        label: selected,
        data: skills[selected].map(s => s.level),
        backgroundColor: categoryColors[selected] || 'rgba(0,224,255,0.3)',
        borderColor: categoryColors[selected]?.replace('0.5', '1') || 'rgba(0,224,255,1)',
        borderWidth: 2,
        pointBackgroundColor: '#fff',
        pointBorderColor: categoryColors[selected]?.replace('0.5', '1') || 'rgba(0,224,255,1)',
        pointRadius: 5,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      r: {
        angleLines: { display: false },
        suggestedMin: 0,
        suggestedMax: 10,
        pointLabels: {
          color: '#F8F8FF',
          font: { size: 16, family: 'Inter, sans-serif' },
        },
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: {
          color: '#B6FF2D',
          stepSize: 2,
          backdropColor: 'transparent',
        },
      },
    },
    animation: {
      duration: 1200,
      easing: 'easeInOutQuart',
    },
  };
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <div className="flex gap-4 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${selected === cat ? 'bg-accent2 text-background' : 'bg-glass/60 text-text hover:bg-accent2/40'}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <Radar data={data} options={options} style={{ maxHeight: 400 }} />
    </div>
  );
};

export default SkillsRadarChart; 