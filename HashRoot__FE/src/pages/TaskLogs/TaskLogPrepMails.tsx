import type { ColumnsType } from "antd/es/table";
import MainLayout from "../../layout/MainLayout";
import CustomTable from "../../components/Table";
import { PrepMailsLogData, type PrepMailsLog } from "./PrepMailsData";

const columns: ColumnsType<PrepMailsLog> = [
  {
    title: "CSV File Name",
    dataIndex: "fileName",
    key: "fileName",
    render: (text: string) => <div className="whitespace-pre-line">{text}</div>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <span
        className={`font-semibold ${
          status.toLowerCase() === "failed" ? "text-red-600" : "text-green-600"
        }`}
      >
        {status}
      </span>
    ),
  },
  {
    title: "Created at",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Created by",
    dataIndex: "createdBy",
    key: "createdBy",
  },
  {
    title: "Updated at",
    dataIndex: "updatedAt",
    key: "updatedAt",
  },
  {
    title: "Task Logs",
    dataIndex: "taskLogs",
    key: "taskLogs",
    render: (text: string) => <div className="whitespace-pre-line">{text}</div>,
  },
];

const TaskLogPrepMailsDefinition = () => {
  return (
    <MainLayout>
      <CustomTable
        title="Task Statuses"
        data={PrepMailsLogData}
        columns={columns}
      />
    </MainLayout>
  );
};

export default TaskLogPrepMailsDefinition;
