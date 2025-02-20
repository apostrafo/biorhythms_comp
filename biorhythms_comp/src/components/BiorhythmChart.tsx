import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BiorhythmChartProps {
  biorhythm1: any | null;
  biorhythm2: any | null;
}

function BiorhythmChart({ biorhythm1, biorhythm2 }: BiorhythmChartProps) {
  if (!biorhythm1 && !biorhythm2) return null;

  const today = new Date();
  const labels = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() + (i - 15));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const data = {
    labels,
    datasets: [
      biorhythm1 && {
        label: 'Person 1 Physical',
        data: biorhythm1.physical,
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4,
      },
      biorhythm1 && {
        label: 'Person 1 Intellectual',
        data: biorhythm1.intellectual,
        borderColor: 'rgb(147, 51, 234)',
        tension: 0.4,
      },
      biorhythm1 && {
        label: 'Person 1 Emotional',
        data: biorhythm1.emotional,
        borderColor: 'rgb(239, 68, 68)',
        tension: 0.4,
      },
      biorhythm2 && {
        label: 'Person 2 Physical',
        data: biorhythm2.physical,
        borderColor: 'rgb(96, 165, 250)',
        tension: 0.4,
        borderDash: [5, 5],
      },
      biorhythm2 && {
        label: 'Person 2 Intellectual',
        data: biorhythm2.intellectual,
        borderColor: 'rgb(192, 132, 252)',
        tension: 0.4,
        borderDash: [5, 5],
      },
      biorhythm2 && {
        label: 'Person 2 Emotional',
        data: biorhythm2.emotional,
        borderColor: 'rgb(248, 113, 113)',
        tension: 0.4,
        borderDash: [5, 5],
      },
    ].filter(Boolean),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    scales: {
      y: {
        min: -1,
        max: 1,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default BiorhythmChart