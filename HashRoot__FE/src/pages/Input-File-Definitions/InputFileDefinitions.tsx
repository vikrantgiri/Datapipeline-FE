import { useState } from "react";
import { Button, Input, Table } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import HeadingWithButton from "../../components/Heading-button";
import FileDDFilter from "../../components/Filter/FileDDFilter";
import { mockInputFileData, type inputfileData } from "./data";

const { Search } = Input;

const InputFileDefinition = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [showCounts, setShowCounts] = useState(true);

  const [filterTaskType, setFilterTaskType] = useState("All");
  const [filterCampaignType, setFilterCampaignType] = useState("All");
  const [filterUseTabu, setFilterUseTabu] = useState("All");

  const data: inputfileData[] = mockInputFileData;

  const filteredData = data.filter((item) => {
    const matchesSearch = item.id
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesTaskType =
      filterTaskType === "All" || item.taskType === filterTaskType;

    const matchesCampaignType =
      filterCampaignType === "All" || item.campaignType === filterCampaignType;

    const matchesUseTabu =
      filterUseTabu === "All" || item.useTabu === filterUseTabu;

    return (
      matchesSearch && matchesTaskType && matchesCampaignType && matchesUseTabu
    );
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string, record: inputfileData) => (
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
    { title: "TASK TYPE", dataIndex: "taskType", key: "taskType" },
    { title: "CAMPAIGN TYPE", dataIndex: "campaignType", key: "campaignType" },
    { title: "THIRD PARTY", dataIndex: "thirdParty", key: "thirdParty" },
    { title: "USE TABU", dataIndex: "useTabu", key: "useTabu" },
    { title: "CREATED BY", dataIndex: "createdBy", key: "createdBy" },
    { title: "EXECUTIONS", dataIndex: "executions", key: "executions" },
    { title: "ACTION", dataIndex: "action", key: "action" },
    {
      title: "",
      key: "edit",
      render: (_: any) => (
        <Button
          type="primary"
          onClick={() => navigate("/InputFileDefinition/change")}
        >
          Edit
        </Button>
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
            placeholder="Search credentials"
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
            selectLabel1="By Task Type"
            selectLabel2="By Campaign Type"
            selectLabel3="By Use Tabu"
            selectedValue1={filterTaskType}
            selectedValue2={filterCampaignType}
            selectedValue3={filterUseTabu}
            onSelectChange1={(value) => setFilterTaskType(value)}
            onSelectChange2={(value) => setFilterCampaignType(value)}
            onSelectChange3={(value) => setFilterUseTabu(value)}
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
