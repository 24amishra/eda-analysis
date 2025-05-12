import { Line,ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const ScatterPlot = ({ data,lineData, title }) => (
    <ResponsiveContainer width="100%" height={400}>
    <ScatterChart
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    >
      <CartesianGrid />
      <XAxis type="number" dataKey="x" name="Predicted Value" />
      <YAxis type="number" dataKey="y" name="Actual Value" />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      
      <Scatter name="Predictions" data={data} fill="#8884d8" />
      
      {/* {lineData && (
       <Scatter
       name="Regression Line"
       data={lineData} // should contain two points like [{x: 0, y: 0}, {x: 1, y: 1}]
       line
       shape="none"
       stroke="#8884d8"
     />
      )} */}
    </ScatterChart>
  </ResponsiveContainer>
);





export default ScatterPlot;
