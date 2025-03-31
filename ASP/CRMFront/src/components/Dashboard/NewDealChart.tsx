import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { format, parseISO } from "date-fns";
import { useState } from "react";

export const NewDealChart = () => {
  const [showCumulative, setShowCumulative] = useState(true);
  const orders = useSelector((state: RootState) => state.orders.orders);

  console.log("NewDealChart rendered");
  console.log("Orders state:", orders);

  if (!orders || orders.length === 0) {
    console.log("No orders data");
    return null;
  }

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  console.log("Chart CHEK");
  let cumulativeAmount = 0;
  const formattedData = sortedOrders.map((order, index) => {
    cumulativeAmount += order.totalAmount;
    return {
      name: `Deal ${index + 1}`,
      amount: cumulativeAmount,
      singleAmount: order.totalAmount,
      date: format(new Date(order.createdAt), "MMM d"),
      fullDate: format(new Date(order.createdAt), "yyyy-MM-dd"),
    };
  });

  return (
    <div className="bg-dark-card p-6 rounded-lg shadow-md border border-dark-border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-text-light">
          {showCumulative ? "Cumulative Deal Amount" : "Individual Deal Amount"}
        </h2>
        <button
          onClick={() => setShowCumulative(!showCumulative)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
        >
          {showCumulative ? "Show Individual" : "Show Cumulative"}
        </button>
      </div>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={formattedData}>
          <XAxis 
            dataKey="name" 
            stroke="#D580FF"
            tickFormatter={(value, index) => formattedData[index].date}
          />
          <YAxis 
            stroke="#D580FF"
            tickFormatter={(value) => `$${value.toLocaleString('en-US')}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                const amount = showCumulative ? data.amount : data.singleAmount;
                
                return (
                  <div style={{
                    background: "#1E1E2E",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    color: "#FFFFFF",
                    fontSize: "14px",
                    boxShadow: "0px 0px 6px rgba(255, 255, 255, 0.2)"
                  }}>
                    <p>{format(parseISO(data.fullDate), "MMMM d, yyyy")}</p>
                    <p><strong>₽{amount.toLocaleString('en-US')}</strong></p>
                    <p>Deal #{data.name.split(' ')[1]}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line 
            type={showCumulative ? "monotone" : "linear"}
            dataKey={showCumulative ? "amount" : "singleAmount"}
            stroke="#9A4DFF" 
            strokeWidth={2} 
            dot={{ 
              stroke: '#9A4DFF',
              strokeWidth: 2,
              r: 4,
              fill: '#1E1E2E'
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


