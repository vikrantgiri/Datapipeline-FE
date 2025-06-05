import { useState } from "react";
import { Button, Input, Table } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import MainLayout from "../../layout/MainLayout";
import HeadingWithButton from "../../components/Heading-button";
import FileDDFilter from "../../components/Filter/FileDDFilter";
import { mockInputFileData, type inputfileData } from "./data";
import { Link } from "react-router-dom";


const { Search } = Input;

const InputFileDefinition = () => {
  const [searchText, setSearchText] = useState("");
  const [showCounts, setShowCounts] = useState(true);

  const [selectedTaskType, setSelectedTaskType] = useState("All");
  const [selectedThirdType, setSelectedThirdType] = useState("All");
  const [selectedUseTabu, setSelectedUseTabu] = useState("All");

  const data: inputfileData[] = mockInputFileData;

  const filteredData = data.filter((item) => {
    const matchesSearch = item.id.toLowerCase().includes(searchText.toLowerCase());
    const matchesTaskType = selectedTaskType === "All" || item.taskType === selectedTaskType;
    const matchesThirdType = selectedThirdType === "All" || item.thirdParty === selectedThirdType;
    const matchesUseTabu =
      selectedUseTabu === "All" ||
      (selectedUseTabu === "Yes" && item.useTabu === true) ||
      (selectedUseTabu === "No" && item.useTabu === false);

    return matchesSearch && matchesTaskType && matchesThirdType && matchesUseTabu;
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
render: (text: string, record: inputfileData) => (
  <Link to={`/InputFileDefinition/edit/${record.id}`} className="text-blue-600 hover:underline">
    {text}
  </Link>
),

    },
    { title: "TASK TYPE", dataIndex: "taskType", key: "taskType" },
    { title: "CAMPAIGN TYPE", dataIndex: "campaignType", key: "campaignType" },
    { title: "THIRD PARTY", dataIndex: "thirdParty", key: "thirdParty" },
    { title: "USE TABU", dataIndex: "useTabu", key: "useTabu", render: (val: boolean) => (val ? "Yes" : "No") },
    { title: "CREATED BY", dataIndex: "createdBy", key: "createdBy" },
    { title: "EXECUTIONS", dataIndex: "executions", key: "executions" },
    { title: "ACTION", dataIndex: "action", key: "action" },
  ];

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
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
              selectLabel2="By Third Party"
              selectLabel3="By Use Tabu"
              selectedValue1={selectedTaskType}
              selectedValue2={selectedThirdType}
              selectedValue3={selectedUseTabu}
              onSelectChange1={(value) => setSelectedTaskType(value)}
              onSelectChange2={(value) => setSelectedThirdType(value)}
              onSelectChange3={(value) => setSelectedUseTabu(value)}
              selectOptions1={["All", "Prescreen", "Trigger"]}
              selectOptions2={["All", "TransUnion", "Experian", "Other"]}
              selectOptions3={["All", "Yes", "No"]}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default InputFileDefinition;
