import React from 'react';
import { BarChart } from '@mui/x-charts';
import Container from '@mui/material/Container';
import { tGroup } from "../groupdata";

type GroupChartProps = {
  data: tGroup;
  series: {
    'Максимальная высота': boolean;
    'Средняя высота': boolean;
    'Минимальная высота': boolean;
  };
};

function GroupChart({ data, series }: GroupChartProps) {
  const chartSetting = {
    yAxis: [{ label: 'Высота (м)' }],
    height: 400,
  };

  let seriesY = Object.entries(series)
    .filter(item => item[1] == true)
    .map(item => {
      return { "dataKey": item[0], "label": item[0] }
    });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <BarChart
        dataset={data}
        xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
        series={seriesY}
        slotProps={{
          legend: {
            position: { vertical: 'bottom', horizontal: 'center' },
          },
        }}
        {...chartSetting}
      />
    </Container>
  );
}

export default GroupChart;
