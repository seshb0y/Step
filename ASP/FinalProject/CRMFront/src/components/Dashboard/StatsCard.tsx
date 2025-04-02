import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";

interface StatsCardProps {
  title: string;
  value: number | string;
  change: number;
  unit?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, unit }) => {
  const navigate = useNavigate();

  const getRoute = (title: string) => {
    switch (title.toLowerCase()) {
      case "clients":
        return "/clients";
      case "orders":
        return "/orders";
      default:
        return "/dashboard";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-dark-card border border-dark-border shadow-lg rounded-lg p-6 transition hover:shadow-primary-purple/50"
      onClick={() => navigate(getRoute(title))}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-text-light">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-primary-purple">
            {unit}
            {value}
          </div>
          {/* <div className={`text-sm font-medium ${isNegative ? "text-red-400" : "text-green-400"}`}>
            {isNegative ? "▼" : "▲"} {Math.abs(change)}%
          </div> */}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
