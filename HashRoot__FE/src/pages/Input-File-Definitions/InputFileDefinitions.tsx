import { useState, useEffect } from "react";
import { Button, Input, Table, Popconfirm, message } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import HeadingWithButton from "../../components/Heading-button";
import FileDDFilter from "../../components/Filter/FileDDFilter";

import client from "../../api/axiosInstance";

const { Search } = Input;

export interface inputfileData {
  key?: string;
  id: number;
  task_type: string;
  campaign_type: string;
  third_party: string;
  use_tabu: boolean;
  created_by_id: number;
  updated_at: string;
  remote_path: string;
  custom_filename: string | null;
  max_column_size: number;
  // action: string;
  executions: number;
}

const InputFileDefinition = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [showCounts, setShowCounts] = useState(true);
  const [data, setData] = useState<inputfileData[]>([]);
  const [loading, setLoading] = useState(false);

  const [filtertask_type, setFiltertask_type] = useState("All");
  const [filtercampaign_type, setFiltercampaign_type] = useState("All");
  const [filteruse_tabu, setFilteruse_tabu] = useState("All");


  // const handleDelete = (id: number) => {
  //   setData((prev) => prev.filter((item) => item.id !== id));
  // };

    const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await client.delete(`/input-file-def/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));

      message.success("Credential successfully deleted.");
    } catch (error) {
      console.error("Error while delete.", error);
      message.error("Failed to delete credential.");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter((item) => {
    const matchesSearch = item.third_party
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchestask_type =
      filtertask_type === "All" || item.task_type === filtertask_type;

    const matchescampaign_type =
      filtercampaign_type === "All" ||
      item.campaign_type === filtercampaign_type;

    const matchesuse_tabu =
      filteruse_tabu === "All" ||
      (filteruse_tabu === "Yes" && item.use_tabu) ||
      (filteruse_tabu === "No" && !item.use_tabu);

    return (
      matchesSearch &&
      matchestask_type &&
      matchescampaign_type &&
      matchesuse_tabu
    );
  });


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await client.get("/input-file-def");
     
        const rawData = res?.data?.data?.data;

        if (rawData && Array.isArray(rawData)) {
          const parsed = rawData.map((item) => ({
            key: item.id.toString(),
            id: item.id,
            task_type: item.task_type,
            campaign_type: item.campaign_type,
            third_party: item.third_party,
            use_tabu: item.use_tabu,
            created_by_id: item.created_by_id,
            updated_at: item.updated_at,
            remote_path: item.remote_path,
            custom_filename: item.custom_filename,
            max_column_size: item.max_column_size,
            // action: "Edit",
            executions: item.execution,
          }));

          setData(parsed);
        }
      } catch (error) {
        console.error("Failed to fetch input file definition.", error);
        // fallback data
        setData([
          {
            key: "1",
            id: 1,
            task_type: "Prescreen-fallback",
            campaign_type: "aws.snowflake.com",
            third_party: "Experian",
            use_tabu: true,
            created_by_id: 2,
            updated_at: "2025-04-14T21:26:15.327245+00:00",
            remote_path: "/some/path",
            custom_filename: null,
            max_column_size: 100,
            // action: "Edit",
            executions:8,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: number, record: inputfileData) => (
        <Link
          to={{ pathname: "/InputFileDefinition/change" }}
          state={{ record }}
          className="text-blue-600"
        >
          {text}
        </Link>
      ),
    },
    { title: "TASK TYPE", dataIndex: "task_type", key: "task_type" },
    {
      title: "CAMPAIGN TYPE",
      dataIndex: "campaign_type",
      key: "campaign_type",
    },
    { title: "THIRD PARTY", dataIndex: "third_party", key: "third_party" },
    {
      title: "USE TABU",
      dataIndex: "use_tabu",
      key: "use_tabu",
      render: (val: boolean) => (val ? "Yes" : "No"),
    },
    { title: "CREATED BY", dataIndex: "created_by_id", key: "created_by_id" },
    { title: "EXECUTIONS", dataIndex: "executions", key: "executions" },
    {
      title: "",
      key: "edit",
      render: (_: any, record: inputfileData) => (
        <Button
          type="primary"
          onClick={() =>
            navigate("/InputFileDefinition/change", { state: { record } })
          }
        >
          Edit
        </Button>
      ),
    },
    {
      title: "",
      key: "delete",
      render: (_: any, record: inputfileData) => (
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
      <HeadingWithButton
        heading="Select Input File Definition to change"
        buttonText="Add Input File Definition"
        buttonColor="primary"
        buttonIcon={<PlusOutlined />}
        to="/InputFileDefinition/add"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        <div className="lg:col-span-9 w-full">
          <Search
            placeholder="Search credentials by third-party"
            allowClear
            enterButton={<SearchOutlined />}
            className="mb-4 w-full"
            onSearch={(value) => setSearchText(value)}
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <span className="text-sm text-gray-600">
              {filteredData.length} credentials found
            </span>
            <Button icon={<DeleteOutlined />} danger>
              Delete Selected
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table
              columns={columns}
              dataSource={filteredData}
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
            selectLabel1="By Task Type"
            selectLabel2="By Campaign Type"
            selectLabel3="By Use Tabu"
            selectedValue1={filtertask_type}
            selectedValue2={filtercampaign_type}
            selectedValue3={filteruse_tabu}
            onSelectChange1={(value) => setFiltertask_type(value)}
            onSelectChange2={(value) => setFiltercampaign_type(value)}
            onSelectChange3={(value) => setFilteruse_tabu(value)}
            selectOptions1={["All", "Prescreen", "Trigger"]}
            selectOptions2={["All", "TransUnion", "Experian", "Other"]}
            selectOptions3={["All", "Yes", "No"]}
          />
        </div>
      </div>
    </div>
  );
};

export default InputFileDefinition;
