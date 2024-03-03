import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = (props) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: props.labels || ['Label 1', 'Label 2', 'Label 3'],
      datasets: [
        {
          label: props.datasetLabel || 'Dataset 1',
          data: props.data || [30, 50, 20],
          backgroundColor: props.backgroundColor || '#36A2EB',
          borderColor: props.borderColor || '#36A2EB',
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    };

    const ctx = chartRef.current.getContext('2d');
    const myBarChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });

    // Clean up on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
    
  }, [props.data, props.labels, props.backgroundColor, props.borderColor, props.datasetLabel]);

    return <canvas style={{ boxSizing: 'border-box' }} ref={chartRef} />;
};

export default BarChart;
