import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { format, parseISO, eachDayOfInterval } from "date-fns";

export const NewDealsChart = () => {
  const ordersCreatedDates = useSelector((state: RootState) => state.dashboard.ordersCreatedDates);

  if (ordersCreatedDates.length === 0) return null; 

  const sortedDates = [...ordersCreatedDates].sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const startDate = parseISO(sortedDates[0]);
  const endDate = parseISO(sortedDates[sortedDates.length - 1]);

  const dealsByDate: Record<string, number> = {};
  sortedDates.forEach(date => {
    const formattedDate = format(parseISO(date), "yyyy-MM-dd");
    dealsByDate[formattedDate] = (dealsByDate[formattedDate] || 0) + 1;
  });

  let cumulativeDeals = 0;
  const formattedData = eachDayOfInterval({ start: startDate, end: endDate }).map(date => {
    const formattedDate = format(date, "yyyy-MM-dd");

    if (dealsByDate[formattedDate]) {
      cumulativeDeals += dealsByDate[formattedDate];
    }

    return {
      name: format(date, "MMM d"),
      fullDate: formattedDate, 
      deals: cumulativeDeals,
    };
  });

  return (
    <div className="bg-dark-card p-6 rounded-lg shadow-md border border-dark-border">
      <h2 className="text-lg font-semibold text-text-light mb-4">New Deals</h2>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={formattedData}>
          <XAxis dataKey="name" stroke="#D580FF" />
          <YAxis stroke="#D580FF" />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                
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
                    <p><strong>{data.deals}</strong> deals</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line type="natural" dataKey="deals" stroke="#9A4DFF" strokeWidth={1} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
