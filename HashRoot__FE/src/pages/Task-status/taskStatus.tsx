import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Input, Table } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import HeadingWithButton from "../../components/Heading-button";
import FileDDFilter from "../../components/Filter/FileDDFilter";
import { taskStatusData } from "./data";

const { Search } = Input;

const TaskStatus = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [showCounts, setShowCounts] = useState(true);

  const [statusFilter, setStatusFilter] = useState("All");
  const [createdAtFilter, setCreatedAtFilter] = useState("Any date");

  const filteredData = taskStatusData.filter((item) => {
    const searchLower = searchText.toLowerCase();
    const matchesSearch =
      item.taskDefinition.toLowerCase().includes(searchLower) ||
      item.status.toLowerCase().includes(searchLower) ||
      item.createdBy.toLowerCase().includes(searchLower);

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

   
    const today = new Date().toISOString().split("T")[0]; 
    const createdAt = item.createdAt;

    let matchesDate = true;
    if (createdAtFilter === "Today") {
      matchesDate = createdAt === today;
    } else if (createdAtFilter === "Past 7 Day") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      matchesDate = new Date(createdAt) >= sevenDaysAgo;
    } else if (createdAtFilter === "This month") {
      const createdDate = new Date(createdAt);
      const now = new Date();
      matchesDate =
        createdDate.getMonth() === now.getMonth() &&
        createdDate.getFullYear() === now.getFullYear();
    } else if (createdAtFilter === "This Year") {
      const createdDate = new Date(createdAt);
      matchesDate = createdDate.getFullYear() === new Date().getFullYear();
    }

    return matchesSearch && matchesStatus && matchesDate;
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
    {
      title: "",
      key: "edit",
      render: (_: any) => (
        <Button type="primary" onClick={() => navigate("/TaskStatus/change")}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="">
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
            selectLabel1="By status"
            selectLabel2="By created at"
            selectedValue1={statusFilter}
            selectedValue2={createdAtFilter}
            onSelectChange1={(value) => setStatusFilter(value)}
            onSelectChange2={(value) => setCreatedAtFilter(value)}
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
  );
};

export default TaskStatus;
