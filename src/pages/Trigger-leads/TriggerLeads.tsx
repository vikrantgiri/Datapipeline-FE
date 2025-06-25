import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Input, Table, Popconfirm, message } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import HeadingWithButton from "../../components/Heading-button";
import FileDDFilter from "../../components/Filter/FileDDFilter";
import { triggerLeadsData } from "./data";
import { Trash2 } from "lucide-react";
import client from "../../api/axiosInstance";
import FilterCardWrapper from "../../components/Add-Form-Component/Filter-component/input";
import FilterDropdown from "../../components/Add-Form-Component/Filter-dropdown";
import { getThirdPartyFilters } from "../../api/filter-api";
import { getCampaignFilters, getStatesFilters } from "../../api/filter-api";

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
  const [thirdParyFilters, setThirdPartyFilters] = useState();
  const [selectedFilter, setSelectedFilter] = useState("");
  const [campaignTypeFilters, setCampaignTypeFilters] = useState();
  const [selectedCampaignFilter, setSelectedCampaignFilter] = useState("");
  const [stateFilters, setStateFilters] = useState();
  const [selectedStateFilter, setSelectedStateFilter] = useState("");

  // const handleDelete = (id: number) => {
  //   setData((prev) => prev.filter((item) => item.id !== id));
  // };

  //     const handleDelete = async (id: number) => {
  //   setLoading(true);
  //   try {
  //     await client.delete(`/trigger-leads/${id}`);
  //     setData((prev) => prev.filter((item) => item.id !== id));

  //     message.success("Credential successfully deleted.");
  //   } catch (error) {
  //     console.error("Error while delete.", error);
  //     message.error("Failed to delete credential.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const [selectedDataSource, setSelectedDataSource] = useState("All");
  // const [selectedLeadType, setSelectedLeadType] = useState("All");
  // const [selectedState, setSelectedState] = useState("All");

  // const filteredData = data.filter((item) => {
  //   const search = searchText.toLowerCase();
  //   const matchesSearch =
  //     item.firstName.toLowerCase().includes(search) ||
  //     item.lastName.toLowerCase().includes(search) ||
  //     item.state.toLowerCase().includes(search) ||
  //     item.zip.includes(search);

  //   const matchesDataSource =
  //     selectedDataSource === "All" || item.dataSource === selectedDataSource;

  //   const matchesLeadType =
  //     selectedLeadType === "All" || item.leadType === selectedLeadType;

  //   const matchesState =
  //     selectedState === "All" || item.state === selectedState;

  //   return (
  //     matchesSearch && matchesDataSource && matchesLeadType && matchesState
  //   );
  // });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // throw new Error("Simulated failure");

        const res = await client.post(
          `/trigger-leads/filtered?skip=0&limit=100`,
          {
            data_source: String(selectedFilter),
            lead_type: String(selectedCampaignFilter),
            us_states: String(selectedStateFilter),
          }
        );
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
  }, [selectedFilter, selectedCampaignFilter, selectedStateFilter]);

  console.log("SELECTED 3rd party FILTER", selectedFilter);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [thirdPartyRes, campaignRes, stateRes] = await Promise.all([
          getThirdPartyFilters(),
          getCampaignFilters(),
          getStatesFilters(),
        ]);

        setThirdPartyFilters(thirdPartyRes?.data || []);
        setCampaignTypeFilters(campaignRes?.data || []);
        setStateFilters(stateRes?.data || []);
      } catch (error) {
        console.error("Failed to fetch filters", error);
      }
    };

    fetchFilters();
  }, []);

  const columns: ColumnsType<TriggerLeadItem> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (text: string, record: any) => (
        <Link
          to={{
            pathname: "",
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
  ];

  return (
    <div className="">
      <HeadingWithButton
        heading="Select Trigger Leads to change"
        // buttonText="Add Trigger Leads"
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

          {/* <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <span className="text-sm text-gray-600">
              {filteredData.length} lead(s) found
            </span>
            <Button icon={<DeleteOutlined />} danger>
              Delete Selected
            </Button>
          </div> */}

          <div className="overflow-x-auto">
            <Table
              columns={columns}
              dataSource={data}
              bordered
              rowKey="id"
              loading={loading}
              // pagination={{ pageSize: 20, showSizeChanger: true }}
              scroll={{ x: "max-content" }}
            />
          </div>
        </div>

        <div className="lg:col-span-3 w-full">
          <FilterCardWrapper>
            <FilterDropdown
              title="By Data Source"
              options={thirdParyFilters}
              onChange={(value) => setSelectedFilter(value)}
              value={selectedFilter}
            />
            <FilterDropdown
              title="By Lead Type"
              options={campaignTypeFilters}
              onChange={(value) => setSelectedCampaignFilter(value)}
              value={selectedCampaignFilter}
            />
            <FilterDropdown
              title="By State"
              options={stateFilters}
              onChange={(value) => setSelectedStateFilter(value)}
              value={selectedStateFilter}
            />
          </FilterCardWrapper>
        </div>
      </div>
    </div>
  );
};

export default TriggerLeads;
