import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { Button, Input, Table, Popconfirm } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import HeadingWithButton from "../../components/Heading-button";
import FileDDFilter from "../../components/Filter/FileDDFilter";
import { triggerLeadsData } from "./data";
import { Trash2 } from "lucide-react";
import client from "../../api/axiosInstance";
const { Search } = Input;

export interface TriggerLeadItem {
  key: string;
  id: number;
  firstName: string;
  lastName: string;
  state: string;
  zip: string;
  dataSource: string;
  leadType: string;
  createdAt: string;
}

const TriggerLeads = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [showCounts, setShowCounts] = useState(true);

    const [data, setData] = useState<TriggerLeadItem[]>([]);
    const [loading, setLoading] = useState(false);

    const handleDelete = (id: number) => {
      setData((prev) => prev.filter((item) => item.id !== id));
    };

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // throw new Error("Simulated failure");

        const res = await client.get(`/trigger-leads`);
        console.log(res?.data?.data);
        setData(res?.data?.data?.data);
      } catch (error) {
        console.log("Failed to fetch trigger leads", error);
        const fallbackData: TriggerLeadItem[] = [
          {
            key: "1",
            id: 680,
            firstName: "MICHAEL-fallback",
            lastName: "BROWN",
            state: "MI",
            zip: "48820",
            dataSource: "Experian",
            leadType: "HECM to HECM",
            createdAt: "June 4, 2025, 2:13 a.m.",
          },
          {
            key: "2",
            id: 679,
            firstName: "TATIANA",
            lastName: "SUAREZ",
            state: "CO",
            zip: "80542",
            dataSource: "Experian",
            leadType: "HECM to HECM",
            createdAt: "June 4, 2025, 2:13 a.m.",
          },
        ];
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    //   }
    // };
    // console.log(data);
    fetchData();
  }, []);

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
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "LAST NAME",
      dataIndex: "last_name",
      key: "last_name",
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
      dataIndex: "data_source",
      key: "data_source",
    },
    {
      title: "LEAD TYPE",
      dataIndex: "lead_type",
      key: "lead_type",
    },
    {
      title: "CREATED AT",
      dataIndex: "created_at",
      key: "created_at",
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
    {
      title: "",
      key: "delete",
      render: (_:any, record:any) => (
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
              dataSource={data}
              rowSelection={{ type: "checkbox" }}
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
