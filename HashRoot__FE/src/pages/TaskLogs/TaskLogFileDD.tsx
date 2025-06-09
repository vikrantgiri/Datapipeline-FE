import type { ColumnsType } from "antd/es/table";
import MainLayout from "../../layout/MainLayout";
import CustomTable from "../../components/Table";
import { FileDownloadLogData, type FileDownloadLog } from "./Filedownloaddata";

const columns: ColumnsType<FileDownloadLog> = [
  {
    title: "Task logs",
    dataIndex: "taskLogs",
    key: "taskLogs",
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
];

const TaskLogfileDD = () => {
  return (
    <MainLayout>
      <CustomTable
      
        title="File Download Statuses"
        data={FileDownloadLogData}
        columns={columns}
      />
    </MainLayout>
  );
};

export default TaskLogfileDD;
