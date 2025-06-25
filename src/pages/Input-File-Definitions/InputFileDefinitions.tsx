import { useEffect, useState } from "react";
import { Button, Input, Table, message, Popconfirm } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { Trash2 } from "lucide-react";

import HeadingWithButton from "../../components/Heading-button";
import client from "../../api/axiosInstance";
import FilterCardWrapper from "../../components/Add-Form-Component/Filter-component/input";
import FilterDropdown from "../../components/Add-Form-Component/Filter-dropdown";
import { getTaskTypeFilters, getThirdPartyFilters } from "../../api/filter-api";

const { Search } = Input;

export interface inputfileData {
  key?: string;
  id: number;
  task_type: string;
  third_party: string;
  use_tabu: boolean;
  created_by?: {
    id?: number;
    username?: string;
  };
  updated_at: string;
  remote_path: string;
  custom_filename: string | null;
  sql_script?: string;
  max_column_size: number;
}

const InputFileDefinition = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<inputfileData[]>([]);
  const [loading, setLoading] = useState(false);

  const [taskTypeFilters, setTaskTypeFilters] = useState<any[]>([]);
  const [thirdPartyFilters, setThirdPartyFilters] = useState<any[]>([]);

  const [selectedTaskType, setSelectedTaskType] = useState("");
  const [selectedThirdParty, setSelectedThirdParty] = useState("");
  const [selectedUseTabu, setSelectedUseTabu] = useState("");

  // const filteredData = data.filter((item) => {
  //   const matchesSearch = item.third_party
  //     .toLowerCase()
  //     .includes(searchText.toLowerCase());

  //   const matchesTaskType =
  //     selectedTaskType === "All" || item.task_type === selectedTaskType;

  //   const matchesThirdParty =
  //     selectedThirdParty === "All" || item.third_party === selectedThirdParty;

  //   const matchesUseTabu =
  //     selectedUseTabu === "All" ||
  //     (selectedUseTabu === "Yes" && item.use_tabu === true) ||
  //     (selectedUseTabu === "No" && item.use_tabu === false);

  //   return (
  //     matchesSearch && matchesTaskType && matchesThirdParty && matchesUseTabu
  //   );
  // });

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await client.delete(`/input-file-def/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));
      message.success("Credential successfully deleted.");
    } catch (error) {
      console.error("Error while deleting.", error);
      message.error("Failed to delete credential.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await client.post(
          "/input-file-def/filtered?skip=0&limit=100",
          {
            task_type: String(selectedTaskType),
            third_party: String(selectedThirdParty),
            use_tabu: String(selectedUseTabu),
          }
        );
        const rawData = res?.data?.data?.data;

        if (Array.isArray(rawData)) {
          const parsed = rawData.map((item) => ({
            ...item,
            key: item.id.toString(),
            created_by: {
              username: item?.user?.username,
              id: item?.user?.id,
            },
          }));
          setData(parsed);
        }
      } catch (error) {
        console.error("Failed to fetch input file definition.", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTaskType, selectedThirdParty, selectedUseTabu]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [taskRes, thirdRes] = await Promise.all([
          getTaskTypeFilters(),
          getThirdPartyFilters(),
        ]);

        setTaskTypeFilters(taskRes?.data || []);
        setThirdPartyFilters(thirdRes?.data || []);
      } catch (error) {
        console.error("Failed to fetch filters", error);
      }
    };

    fetchFilters();
  }, []);

  console.log(data);

  const columns: ColumnsType<inputfileData> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        <Link to="/InputFileDefinition/change" state={{ record }}>
          {text}
        </Link>
      ),
    },
    { title: "TASK TYPE", dataIndex: "task_type", key: "task_type" },
    { title: "THIRD PARTY", dataIndex: "third_party", key: "third_party" },
    {
      title: "USE TABU",
      dataIndex: "use_tabu",
      key: "use_tabu",
      render: (val: boolean) => (val ? "Yes" : "No"),
    },
    {
      title: "CREATED BY",
      dataIndex: "created_by",
      key: "created_by",
      render: (created_by) => created_by?.username,
    },
    {
      title: "",
      key: "edit",
      render: (_, record) => (
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
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this log?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<Trash2 size={16} />} danger />
        </Popconfirm>
      ),
    },
  ];

  const useTabuOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  return (
    <div>
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
            placeholder="Search by third-party"
            allowClear
            enterButton={<SearchOutlined />}
            className="mb-4 w-full"
            onSearch={(value) => setSearchText(value)}
          />
          <Table
            columns={columns}
            dataSource={data} //why not filteredData
            rowKey="id"
            bordered
            loading={loading}
            scroll={{ x: "max-content" }}
            // pagination={{ pageSize: 20, showSizeChanger: true }}
          />
        </div>

        <div className="lg:col-span-3 w-full space-y-4">
          <FilterCardWrapper>
            <FilterDropdown
              title="By Task Type"
              options={taskTypeFilters}
              onChange={(value) => setSelectedTaskType(value)}
              value={selectedTaskType}
            />
            <FilterDropdown
              title="By Third Party"
              options={thirdPartyFilters}
              onChange={(value) => setSelectedThirdParty(value)}
              value={selectedThirdParty}
            />
            <FilterDropdown
              title="By Use Tabu"
              options={useTabuOptions}
              onChange={(value) => setSelectedUseTabu(value)}
              value={selectedUseTabu}
            />
          </FilterCardWrapper>
        </div>
      </div>
    </div>
  );
};

export default InputFileDefinition;
