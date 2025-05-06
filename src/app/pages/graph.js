import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const HistogramChart = ({ data, title }) => (
  <div style={{ padding: '16px' }}>
    <h2>{title}</h2>
    <div style={{ width: 600 }}>
      <LineChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="bin" />
        <YAxis />
        <Tooltip />
        <Line  dataKey="count" fill="#8884d8" />
      </LineChart>
    </div>
  </div>
);

export default HistogramChart;
