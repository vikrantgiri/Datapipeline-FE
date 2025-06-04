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
import {mockInputFileData, type inputfileData} from './data'

const { Search } = Input;

const InputFileDefinition = () => {
  const [searchText, setSearchText] = useState("");
  const [showCounts, setShowCounts] = useState(true);
  const [selectedSource, setSelectedSource] = useState("All");


  const data: inputfileData[] = mockInputFileData;

  const filteredData = data.filter((item) => {
    const matchesSearch = item.id
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesFilter =
      selectedSource === "All" || item.taskType === selectedSource;
    return matchesSearch && matchesFilter;
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <span className="text-blue-600">{text}</span>,
    },
    { title: "TASK TYPE", dataIndex: "taskType", key: "taskType" },
    { title: "CAMPAIGN TYPE", dataIndex: "campaignType", key: "campaignType" },
    { title: "THIRD PARTY", dataIndex: "thirdParty", key: "thirdParty" },
    { title: "USE TABU", dataIndex: "useTabu", key: "useTabu" },
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
              selectLabel1=" By task type"
              selectLabel2="By TASK TYPE"
              selectLabel3="By use tabu"
              
              selectedValue1={selectedSource}
              selectedValue2={selectedSource}
              selectedValue3={selectedSource}
              
              onSelectChange1={(value) => setSelectedSource(value)}
              onSelectChange2={(value) => setSelectedSource(value)}
              onSelectChange3={(value) => setSelectedSource(value)}
              
              selectOptions1={[
                "All",
                "Prescreen",
                "Trigger"
              ]}
            
              selectOptions2={["All", "TransUnion", "Experian","other"]}
              selectOptions3={["All", "Yes", "No"]}
              
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default InputFileDefinition;
