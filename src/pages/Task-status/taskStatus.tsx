import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { Button, Input, Table, Popconfirm } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import HeadingWithButton from "../../components/Heading-button";
import FileDDFilter from "../../components/Filter/FileDDFilter";
import { taskStatusData } from "./data";
import { Trash2 } from "lucide-react";
import client from "../../api/axiosInstance";

const { Search } = Input;

export interface TaskStatusItem {
  key: string;
  id: number;
  taskDefinition: string;
  status: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
}

const TaskStatus = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [showCounts, setShowCounts] = useState(true);

  
    const [data, setData] = useState<TaskStatusItem[]>([]);
    const [loading, setLoading] = useState(false);
   
    const handleDelete = (id: number) => {
      setData((prev) => prev.filter((item) => item.id !== id));
    };

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


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // throw new Error("Simulated failure");

        const res = await client.get(`/task-status`);
        console.log(res?.data?.data);
        setData(res?.data?.data?.data);
      } catch (error) {
        console.log("Failed to fetch task status", error);
        const fallbackData: TaskStatusItem[] = [
          {
            key: "1",
            id: 98,
            taskDefinition: "TRIGGER - EXP- fallback",
            status: "Completed",
            createdAt: "May 29, 2025, 11:05 a.m.",
            createdBy: "super",
            updatedAt: "May 29, 2025, 11:06 a.m.",
          },
          {
            key: "2",
            id: 97,
            taskDefinition: "TRIGGER - TU",
            status: "Completed with errors",
            createdAt: "May 5, 2025, 8:08 a.m.",
            createdBy: "admin",
            updatedAt: "May 5, 2025, 8:37 a.m.",
          },
        ];
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    //   }
    // };
    // console.log(data);
    fetchData();
  }, []);

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
    {
      title: "",
      key: "delete",
      render: (_:any, record:any) => (
        <Popconfirm
          title="Are you sure to delete this Log?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<Trash2 size={16} className="text-red-600" />} danger />
        </Popconfirm>
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
              dataSource={data}
              // rowSelection={{ type: "checkbox" }}
              bordered
              loading={loading}
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
