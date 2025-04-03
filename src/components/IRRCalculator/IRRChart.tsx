
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface DataPoint {
  year: number;
  value: number;
  cumulativeValue: number;
}

interface IRRChartProps {
  data: DataPoint[];
}

const IRRChart: React.FC<IRRChartProps> = ({ data }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="font-medium text-sm">Year {label}</p>
          <p className="text-sm text-gray-600">
            Cash Flow: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-primary font-medium">
            Cumulative: {formatCurrency(payload[1].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7ac9a7" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#7ac9a7" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#245e4f" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#245e4f" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="year"
          label={{
            value: "Year",
            position: "insideBottomRight",
            offset: -10,
          }}
        />
        <YAxis
          tickFormatter={formatCurrency}
          width={70}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={0} stroke="#000" strokeDasharray="3 3" />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#7ac9a7"
          fillOpacity={1}
          fill="url(#colorValue)"
          name="Cash Flow"
        />
        <Area
          type="monotone"
          dataKey="cumulativeValue"
          stroke="#245e4f"
          fillOpacity={1}
          fill="url(#colorCumulative)"
          name="Cumulative Value"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default IRRChart;
