import { useState } from "react";
import { Button, Input, Table } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";

import HeadingWithButton from "../../components/Heading-button";
import FileDDFilter from "../../components/Filter/FileDDFilter";

import {
  fileDownloadDefinitionData,
  type FileDownloadDefinitionItem,
} from "./data";

const { Search } = Input;

const FileDownloadDefinition = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [showCounts, setShowCounts] = useState(true);
  const [selectedSource, setSelectedSource] = useState("All");

  const filteredData = fileDownloadDefinitionData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesFilter =
      selectedSource === "All" || item.credentials === selectedSource;
    return matchesSearch && matchesFilter;
  });

  const columns: ColumnsType<FileDownloadDefinitionItem> = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: FileDownloadDefinitionItem) => (
        <Link
          to={{
            pathname: "/FileDownloadDefinition/change",
          }}
          state={{ record }}
        >
          {text}
        </Link>
      ),
    },
    { title: "CREDENTIALS", dataIndex: "credentials", key: "credentials" },
    { title: "REMOTE PATH", dataIndex: "remotepath", key: "remotepath" },
    { title: "CREATED AT", dataIndex: "createdAt", key: "createdAt" },
    { title: "CREATED BY", dataIndex: "createdBy", key: "createdBy" },
    { title: "ACTION", dataIndex: "action", key: "action" },
    {
      title: "",
      key: "edit",
      render: (_: any) => (
        <Button
          type="primary"
          onClick={() => navigate("/FileDownloadDefinition/change")}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="">
      <HeadingWithButton
        heading="Select File Download Definition to change"
        buttonText="Add File Download Definition"
        buttonColor="primary"
        buttonIcon={<PlusOutlined />}
        to="/FileDownloadDefinition/add"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        <div className="lg:col-span-9 w-full">
          <Search
            placeholder="Search File Download Definition"
            allowClear
            enterButton={<SearchOutlined />}
            className="mb-4 w-full"
            onSearch={(value) => setSearchText(value)}
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <span className="text-sm text-gray-600">
              {filteredData.length} File Download Definition found
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
            selectLabel1="By Credentials"
            selectLabel2="By Post DC"
            selectLabel3="By post to call shaper"
            selectLabel4="By insert to postgres"
            selectedValue1={selectedSource}
            selectedValue2={selectedSource}
            selectedValue3={selectedSource}
            selectedValue4={selectedSource}
            onSelectChange1={(value) => setSelectedSource(value)}
            onSelectChange2={(value) => setSelectedSource(value)}
            onSelectChange3={(value) => setSelectedSource(value)}
            onSelectChange4={(value) => setSelectedSource(value)}
            selectOptions1={[
              "All",
              "Experian Prescreen Data Gateway",
              "TransUnion Data Gateway",
              "Marketing Postgres",
              "Snowflake",
              "Experian Trigger",
              "Experian Input Files",
            ]}
            selectOptions2={["All", "Yes", "No"]}
            selectOptions3={["All", "Yes", "No"]}
            selectOptions4={["All", "Yes", "No"]}
          />
        </div>
      </div>
    </div>
  );
};

export default FileDownloadDefinition;
