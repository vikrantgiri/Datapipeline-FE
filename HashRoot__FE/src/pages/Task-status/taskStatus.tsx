import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, Input, Table } from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import MainLayout from "../../layout/MainLayout";
import HeadingWithButton from "../../components/Heading-button";
import FileDDFilter from "../../components/Filter/FileDDFilter";
import { taskStatusData } from "./data";

const { Search } = Input;

const TaskStatus = () => {
  const [searchText, setSearchText] = useState("");
  const [showCounts, setShowCounts] = useState(true);
  const [selectedSource, setSelectedSource] = useState("All");

  const filteredData = taskStatusData.filter((item) => {
    const searchLower = searchText.toLowerCase();
    const matchesSearch =
      item.taskDefinition.toLowerCase().includes(searchLower) ||
      item.status.toLowerCase().includes(searchLower) ||
      item.createdBy.toLowerCase().includes(searchLower);

    const matchesFilter =
      selectedSource === "All" || item.status === selectedSource;

    return matchesSearch && matchesFilter;
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (text: string, record: any) => (
        <Link
          to={{
            pathname: "/TaskStatus/change",
          }}
          state={{ record }}
          className="text-blue-600"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "TASK DEFINITION",
      dataIndex: "taskDefinition",
      key: "taskDefinition",
      render: (text: string, record: any) => (
        <Link
          to={{
            pathname: "/InputFileDefinition/change",
          }}
          state={{ record }}
          className="text-blue-600"
        >
          {text}
        </Link>
      ),
    },
    { title: "STATUS", dataIndex: "status", key: "status" },
    { title: "CREATED AT", dataIndex: "createdAt", key: "createdAt" },
    { title: "CREATED BY", dataIndex: "createdBy", key: "createdBy" },
    { title: "UPDATED AT", dataIndex: "updatedAt", key: "updatedAt" },
  ];

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <HeadingWithButton heading="Select Task Status to change" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          <div className="lg:col-span-9 w-full">
            <Search
              placeholder="Search task status"
              allowClear
              enterButton={<SearchOutlined />}
              className="mb-4 w-full"
              onSearch={(value) => setSearchText(value)}
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <span className="text-sm text-gray-600">
                {filteredData.length} task status record(s) found
              </span>
              <Button icon={<DeleteOutlined />} danger>
                Delete Selected
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table
                columns={columns}
                dataSource={filteredData}
                rowSelection={{ type: "checkbox" }}
                bordered
                scroll={{ x: "max-content" }}
              />
            </div>
          </div>

          <div className="lg:col-span-3 w-full">
            <FileDDFilter
              title="Filters"
              showCounts={showCounts}
              setShowCounts={setShowCounts}
              selectLabel1=" By status"
              selectLabel2=" By created at"
              selectedValue1={selectedSource}
              selectedValue2={selectedSource}
              onSelectChange1={(value) => setSelectedSource(value)}
              onSelectChange2={(value) => setSelectedSource(value)}
              selectOptions1={[
                "All",
                "Pending",
                "In Progress",
                "Completed",
                "Completed with errors",
                "Failed",
              ]}
              selectOptions2={[
                "Any date",
                "Today",
                "Past 7 Day",
                "This month",
                "This Year",
              ]}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TaskStatus;
