import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/Table";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { TaskStatus } from "../../types/Task";

export const TasksStatusTable = () => {
  const tasksStatuses = useSelector((state: RootState) => state.dashboard.tasksStatuses);
  const tasksCount = useSelector((state: RootState) => state.dashboard.tasksCount);

  const statusCounts = {
    New: tasksStatuses.filter(status => status === TaskStatus.New).length,
    InProgress: tasksStatuses.filter(status => status === TaskStatus.InProgress).length,
    Completed: tasksStatuses.filter(status => status === TaskStatus.Completed).length,
  };

  const tasksData = [
    { metric: "Total Tasks", value: tasksCount },
    { metric: "New Tasks", value: statusCounts.New },
    { metric: "In Progress", value: statusCounts.InProgress },
    { metric: "Completed", value: statusCounts.Completed },
  ];

  return (
    <div className="bg-dark-card p-6 rounded-lg shadow-md border border-dark-border">
      <h2 className="text-lg font-semibold text-primary-purple mb-4">Tasks Info Table</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-primary-purple bg-dark-bg">Metric</TableHead>
            <TableHead className="text-primary-purple bg-dark-bg">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-primary-purple">
          {tasksData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.metric}</TableCell>
              <TableCell>{item.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
