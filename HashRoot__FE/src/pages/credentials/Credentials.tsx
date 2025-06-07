// src/pages/Credentials/index.tsx

import { useState } from "react";
import { Button, Input, Table } from "antd";
import { PlusOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";

import MainLayout from "../../layout/MainLayout";
import HeadingWithButton from "../../components/Heading-button/index";
import CredentialsFilter from "../../components/Filter/CredentialsFilter";

import { credentialsData, type Credential } from "./data";

const { Search } = Input;

const Credentials = () => {
  const [searchText, setSearchText] = useState("");
  const [showCounts, setShowCounts] = useState(true);
  const [selectedSource, setSelectedSource] = useState("All");

  const filteredData = credentialsData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilter = selectedSource === "All" || item.thirdParty === selectedSource;
    return matchesSearch && matchesFilter;
  });

  const columns: ColumnsType<Credential> = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Credential) => (
        <Link
          to={{
            pathname: "/credentials/change",
          }}
          state={{ record }}
        >
          {text}
        </Link>
      ),
    },
    { title: "THIRD PARTY", dataIndex: "thirdParty", key: "thirdParty" },
    { title: "HOST", dataIndex: "host", key: "host" },
    { title: "DATABASE", dataIndex: "db", key: "db" },
    { title: "USERNAME", dataIndex: "username", key: "username" },
    { title: "CREATED AT", dataIndex: "createdAt", key: "createdAt" },
    { title: "CREATED BY", dataIndex: "createdBy", key: "createdBy" },
  ];

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <HeadingWithButton
          heading="Select Credential"
          buttonText="Add Credentials"
          buttonColor="primary"
          buttonIcon={<PlusOutlined />}
          to="/credentials/add"
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
            <CredentialsFilter
              title="Filters"
              showCounts={showCounts}
              setShowCounts={setShowCounts}
              selectLabel="By Third Party"
              selectedValue={selectedSource}
              onSelectChange={(value) => setSelectedSource(value)}
              selectOptions={[
                "All",
                "TransUnion",
                "Experian",
                "Other",
                "Snowflake",
                "Postgres",
                "DemandConversions",
              ]}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Credentials;
