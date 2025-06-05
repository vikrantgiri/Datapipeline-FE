import { useState } from "react";
import { Button, Input, Table } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import MainLayout from "../../layout/MainLayout";
import HeadingWithButton from "../../components/Heading-button/index";
import FileDDFilter from "../../components/Filter/FileDDFilter";
import {
  fileDownloadDefinitionData,
  fileDownloadDefinitionColumns,
} from "./data";

const { Search } = Input;

const FileDownloadDefinition = () => {
  const [searchText, setSearchText] = useState("");
  const [showCounts, setShowCounts] = useState(true);

  const [selectedCredential, setSelectedCredential] = useState("All");
  const [selectedPostDC, setSelectedPostDC] = useState("All");
  const [selectedPostCallShaper, setSelectedPostCallShaper] = useState("All");
  const [selectedInsertPostgres, setSelectedInsertPostgres] = useState("All");

  const filteredData = fileDownloadDefinitionData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesCredential =
      selectedCredential === "All" || item.name === selectedCredential;

    const matchesPostDC =
      selectedPostDC === "All" ||
      (selectedPostDC === "Yes" && item.post_dc === true) ||
      (selectedPostDC === "No" && item.post_dc === false);

    const matchesPostCallShaper =
      selectedPostCallShaper === "All" ||
      (selectedPostCallShaper === "Yes" && item.post_call_shaper === true) ||
      (selectedPostCallShaper === "No" && item.post_call_shaper === false);

    const matchesInsertPostgres =
      selectedInsertPostgres === "All" ||
      (selectedInsertPostgres === "Yes" && item.insert_postgres === true) ||
      (selectedInsertPostgres === "No" && item.insert_postgres === false);

    return (
      matchesSearch &&
      matchesCredential &&
      matchesPostDC &&
      matchesPostCallShaper &&
      matchesInsertPostgres
    );
  });

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
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
                columns={fileDownloadDefinitionColumns}
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
              selectLabel3="By Post to Call Shaper"
              selectLabel4="By Insert to Postgres"

              selectedValue1={selectedCredential}
              selectedValue2={selectedPostDC}
              selectedValue3={selectedPostCallShaper}
              selectedValue4={selectedInsertPostgres}

              onSelectChange1={(value) => setSelectedCredential(value)}
              onSelectChange2={(value) => setSelectedPostDC(value)}
              onSelectChange3={(value) => setSelectedPostCallShaper(value)}
              onSelectChange4={(value) => setSelectedInsertPostgres(value)}

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
    </MainLayout>
  );
};

export default FileDownloadDefinition;
