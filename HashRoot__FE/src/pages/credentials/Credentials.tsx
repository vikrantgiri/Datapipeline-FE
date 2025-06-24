import { useEffect, useState } from "react";
import { Button, Input, Table, message, Popconfirm } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import HeadingWithButton from "../../components/Heading-button";
import CredentialsFilter from "../../components/Filter/CredentialsFilter";
import { Trash2 } from "lucide-react";
// import { getCredentials } from "../../api/getCredentials";
import client from "../../api/axiosInstance";
import FilterDropdown from "../../components/Add-Form-Component/Filter-dropdown";
import { getThirdPartyFilters } from "../../api/filter-api";
import FilterCardWrapper from "../../components/Add-Form-Component/Filter-component/input";

const { Search } = Input;

export interface Credential {
  id: number;
  name: string;
  third_party: string;
  host: string;
  database: string;
  username: string;
  created_at: string;
  updated_at: string;
  created_by_id: number;
}

const Credentials = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Credential[]>([]);

  const [searchText, setSearchText] = useState("");
  const [thirdParyFilters, setThirdPartyFilters] = useState();
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedSource, setSelectedSource] = useState("All");

  // const [showCounts, setShowCounts] = useState(true);

  const filtered = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (selectedSource === "All" || item.third_party === selectedSource)
    );
  });

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await client.delete(`/credentials/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));

      message.success("Credential successfully deleted.");
    } catch (error) {
      console.error("Error while delete.", error);
      message.error("Failed to delete credential.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await client.post(
          "/credentials/filtered?skip=0&limit=100",
          {
            third_party: selectedFilter,
          }
        );

        console.log(res?.data?.data);
        setData(res?.data?.data?.data);
      } catch (error) {
        console.error("Failed to fetch credentials.", error);
        message.error("Failed to fetch credentials.");

        // fallback data if API fails
        const fallbackData: Credential[] = [
          {
            id: 1,
            name: "aws",
            third_party: "Snowflake",
            host: "aws.snowflake.com",
            database: "avm_db",
            username: "admin_aws",
            created_at: "2024-05-22",
            updated_at: "2024-05-22",
            created_by_id: 0,
          },
          {
            id: 2,
            name: "FTP Login",
            third_party: "TransUnion",
            host: "ftp.tu.com",
            database: "trigger_leads",
            username: "ftp_user",
            created_at: "2024-05-21",
            updated_at: "2024-05-21",
            created_by_id: 1,
          },
        ];


        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedFilter]);

  console.log("SELECTED FILTER", selectedFilter);

  useEffect(() => {
    const fetchFilter = async () => {
      const res = getThirdPartyFilters();
      res
        .then((data) => {
          console.log(data);
          setThirdPartyFilters(data?.data);
        })
        .catch((error) => {
          throw error;
        });
    };
    fetchFilter();
  }, []);

  const columns: ColumnsType<Credential> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link to="/credentials/change" state={{ record }}>
          {text}
        </Link>
      ),
    },
    { title: "Third Party", dataIndex: "third_party", key: "third_party" },
    { title: "Host", dataIndex: "host", key: "host" },
    { title: "Database", dataIndex: "database", key: "database" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Created At", dataIndex: "created_at", key: "created_at" },
    // { title: "Updated At", dataIndex: "(updated_at)", key: "(updated_at)" },
    {
      title: "",
      key: "edit",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => navigate("/credentials/change", { state: { record } })}
        >
          Edit
        </Button>
      ),
    },
    {
      title: "",
      key: "delete",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this credential?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<Trash2 size={16} />} danger />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
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

          {/* <div className="flex justify-between mb-4">
            <span>{filtered.length} credentials found</span>
            <Button
              onClick={() => message.info("Bulk delete not implemented")} 
              icon={<DeleteOutlined />}
              danger
            >
              Delete Selected
            </Button>
          </div> */}

          <Table
            loading={loading}
            columns={columns}
            dataSource={filtered}
            rowKey="id"
            // pagination={{ pageSize: 20, showSizeChanger: true }}
            bordered
            scroll={{ x: "max-content" }}
          />
        </div>

        <div className="lg:col-span-3 w-full">
          {/* <CredentialsFilter
            title="Filters"
            showCounts={showCounts}
            setShowCounts={(val) => setShowCounts(val)}
            selectLabel="By Third Party"
            selectedValue={selectedSource}
            onSelectChange={(value) => setSelectedSource(value)}
            // selectOptions={[
            //   "All",
            //   "TransUnion",
            //   "Experian",
            //   "Snowflake",
            //   "Other",
            // ]}
          /> */}
          <div className="lg:col-span-3 w-full">
            <FilterCardWrapper>
              <FilterDropdown
                title="Third Pary"
                options={thirdParyFilters}
                onChange={(value) => setSelectedFilter(value)}
                value={selectedFilter}
              />
            </FilterCardWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credentials;
