import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Input, Table } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import HeadingWithButton from "../../components/Heading-button";
import FileDDFilter from "../../components/Filter/FileDDFilter";
import { triggerLeadsData } from "./data";

const { Search } = Input;

const TriggerLeads = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [showCounts, setShowCounts] = useState(true);


  const [selectedDataSource, setSelectedDataSource] = useState("All");
  const [selectedLeadType, setSelectedLeadType] = useState("All");
  const [selectedState, setSelectedState] = useState("All");

  const filteredData = triggerLeadsData.filter((item) => {
    const search = searchText.toLowerCase();
    const matchesSearch =
      item.firstName.toLowerCase().includes(search) ||
      item.lastName.toLowerCase().includes(search) ||
      item.state.toLowerCase().includes(search) ||
      item.zip.includes(search);

    const matchesDataSource =
      selectedDataSource === "All" || item.dataSource === selectedDataSource;

    const matchesLeadType =
      selectedLeadType === "All" || item.leadType === selectedLeadType;

    const matchesState =
      selectedState === "All" || item.state === selectedState;

    return (
      matchesSearch && matchesDataSource && matchesLeadType && matchesState
    );
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (text: string, record: any) => (
        <Link
          to={{
            pathname: "/TriggerLeads/change",
          }}
          state={{ record }}
          className="text-blue-600"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "FIRST NAME",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "LAST NAME",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "STATE",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "ZIP",
      dataIndex: "zip",
      key: "zip",
    },
    {
      title: "DATA SOURCE",
      dataIndex: "dataSource",
      key: "dataSource",
    },
    {
      title: "LEAD TYPE",
      dataIndex: "leadType",
      key: "leadType",
    },
    {
      title: "CREATED AT",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "",
      key: "edit",
      render: (_: any) => (
        <Button type="primary" onClick={() => navigate("/TriggerLeads/change")}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="">
      <HeadingWithButton
        heading="Select Trigger Leads to change"
        buttonText="Add Trigger Leads"
        buttonColor="primary"
        buttonIcon={<PlusOutlined />}
        to="/TriggerLeads/add"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        <div className="lg:col-span-9 w-full">
          <Search
            placeholder="Search trigger leads"
            allowClear
            enterButton={<SearchOutlined />}
            className="mb-4 w-full"
            onSearch={(value) => setSearchText(value)}
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <span className="text-sm text-gray-600">
              {filteredData.length} lead(s) found
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
            selectLabel1="By data source"
            selectLabel2="By lead type"
            selectLabel3="By state"
            selectedValue1={selectedDataSource}
            selectedValue2={selectedLeadType}
            selectedValue3={selectedState}
            onSelectChange1={(value) => setSelectedDataSource(value)}
            onSelectChange2={(value) => setSelectedLeadType(value)}
            onSelectChange3={(value) => setSelectedState(value)}
            selectOptions1={["All", "TransUnion", "Experian", "unspecified"]}
            selectOptions2={[
              "All",
              "HECM to HECM",
              "First Time Reverse",
              "Unspecified",
            ]}
            selectOptions3={[
              "All",
              "AK",
              "AL",
              "AR",
              "AZ",
              "CA",
              "CO",
              "CT",
              "DC",
              "DE",
              "FL",
              "GA",
              "IA",
              "ID",
              "IL",
              "IN",
              "KS",
              "KY",
              "LA",
              "MA",
              "MD",
              "ME",
              "MI",
              "MN",
              "MO",
              "MT",
              "NC",
              "NE",
              "NH",
              "NJ",
              "NM",
              "NV",
              "NY",
              "OH",
              "OK",
              "OR",
              "PA",
              "RI",
              "SC",
              "TN",
              "TX",
              "UT",
              "VA",
              "WA",
              "WI",
              "WY",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default TriggerLeads;
