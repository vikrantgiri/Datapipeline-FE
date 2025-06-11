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

  const [filterCredentials, setFilterCredentials] = useState("All");
  const [filterPostDC, setFilterPostDC] = useState("All");
  const [filterPostCallShaper, setFilterPostCallShaper] = useState("All");
  const [filterInsertPostgres, setFilterInsertPostgres] = useState("All");

  const filteredData = fileDownloadDefinitionData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesCredentials =
      filterCredentials === "All" || item.credentials === filterCredentials;

    const matchesPostDC =
      filterPostDC === "All" || item.postDC === filterPostDC;

    const matchesCallShaper =
      filterPostCallShaper === "All" ||
      item.postCallShaper === filterPostCallShaper;

    const matchesInsertPostgres =
      filterInsertPostgres === "All" ||
      item.insertPostgres === filterInsertPostgres;

    return (
      matchesSearch &&
      matchesCredentials &&
      matchesPostDC &&
      matchesCallShaper &&
      matchesInsertPostgres
    );
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
    <div>
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
            selectedValue1={filterCredentials}
            selectedValue2={filterPostDC}
            selectedValue3={filterPostCallShaper}
            selectedValue4={filterInsertPostgres}
            onSelectChange1={setFilterCredentials}
            onSelectChange2={setFilterPostDC}
            onSelectChange3={setFilterPostCallShaper}
            onSelectChange4={setFilterInsertPostgres}
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
