import { useEffect, useState } from "react";
import { Button, Input, Table, Popconfirm, message } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import HeadingWithButton from "../../components/Heading-button";
import { Trash2 } from "lucide-react";
import client from "../../api/axiosInstance";
import { getCredentialsFilters } from "../../api/filter-api";
import FilterCardWrapper from "../../components/Add-Form-Component/Filter-component/input";
import FilterDropdown from "../../components/Add-Form-Component/Filter-dropdown";
// import FileDDFilter from "../../components/Filter/FileDDFilter";
// import {
//   fileDownloadDefinitionData,
//   type FileDownloadDefinitionItem,
// } from "./data";

const { Search } = Input;

export interface FileDownloadDefinitionItem {
  id: number;
  // key: string;
  name?: string;
  credentials?: {
    id?: number;
    name?: string;
  };
  remote_path?: string;
  created_at?: string;
  created_by?: {
    id?: number;
    username?: string;
  };
  action?: string;

  post_to_dc?: string;
  post_to_call_shaper?: string;
  insert_to_postgres?: string;
  append_placekey?: string;
  append_phone_no?: string;
  append_email?: string;
  append_home_value?: string;
  dc_lead_token?: string;
  dc_lead_key?: string;
}

const FileDownloadDefinition = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<FileDownloadDefinitionItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [credentialsFilters, setCredentialsFilters] = useState<
    { [key: string]: string }[]
  >([]);
  const [selectedCredential, setSelectedCredential] = useState<string>("All");
  // const [selectedFilter, setSelectedFilter] = useState<string>("All");

  // const [filterCredentials, setFilterCredentials] = useState();

  const [filterPostDC, setFilterPostDC] = useState("All");
  const [filterPostCallShaper, setFilterPostCallShaper] = useState("All");
  const [filterInsertPostgres, setFilterInsertPostgres] = useState("All");

  // const [selectedPostDC, setSelectedPostDC] = useState("All");
  // const [selectedPostCallShaper, setSelectedPostCallShaper] = useState("All");
  // const [selectedInsertPG, setSelectedInsertPG] = useState("All");
  // const handleDelete = (id: number) => {
  //   setData((prev) => prev.filter((item) => item.id !== id));
  // };

  const filteredData = data.filter((item) => {
    const matchesSearch = (item.credentials?.name ?? "")
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesPostDC =
      filterPostDC === "All" || item.post_to_dc === filterPostDC;

    const matchesPostCallShaper =
      filterPostCallShaper === "All" ||
      item.post_to_call_shaper === filterPostCallShaper;

    const matchesInsertPostgres =
      filterInsertPostgres === "All" ||
      item.insert_to_postgres === filterInsertPostgres;

    return (
      matchesSearch &&
      matchesPostDC &&
      matchesPostCallShaper &&
      matchesInsertPostgres
    );
  });

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await client.delete(`/file-download-def/${id}`);
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
        // throw new Error("Simulated failure");

        // const res = await client.post("/file-download-def/filtered",
        //   {
        //   credentials_id: Number(selectedCredential),
        //   // dent other things as payload
        // });

        const res = await client.post(
          "/file-download-def/filtered?skip=0&limit=100",
          {
            credentials_id:
              selectedCredential === "All"
                ? undefined
                : Number(selectedCredential),
            post_to_dc: filterPostDC === "All" ? undefined : filterPostDC,
            post_to_call_shaper:
              filterPostCallShaper === "All" ? undefined : filterPostCallShaper,
            insert_to_postgres:
              filterInsertPostgres === "All" ? undefined : filterInsertPostgres,
          }
        );

        console.log(res?.data?.data);
        // setData(res?.data?.data?.data);
        setData(
          res?.data?.data?.data?.map((item: any) => ({
            key: item.id.toString(),
            name: item.name,
            credentials: item.credentials,
            remote_path: item.remote_path,
            created_at: item.created_at,
            created_by: item.user,
            action: "Download File",
            post_to_dc: item.post_to_dc ? "Yes" : "No",
            post_to_call_shaper: item.post_to_call_shaper ? "Yes" : "No",
            insert_to_postgres: item.insert_to_postgres ? "Yes" : "No",
            append_placekey: item.append_placekey ? "Yes" : "No",
            append_phone_no: item.append_phone_no ? "Yes" : "No",
            append_email: item.append_email ? "Yes" : "No",

            append_home_value: item.append_home_value ? "Yes" : "No",
            dc_lead_token: item.dc_lead_token ? "Yes" : "No",
            dc_lead_key: item.dc_lead_key ? "Yes" : "No",
          }))
        );
      } catch (error) {
        console.log("Failed to fetch file download definition", error);
        message.error("Failed to fetch credentials.");

        // fallback data
        const fallbackData: FileDownloadDefinitionItem[] = [
          {
            id: 1,
            name: "Fallback File 1",
            credentials: { id: 1, name: "TransUnion Data Gateway" },
            remote_path: "/remote/path/1",
            created_at: "2025-06-09",
            created_by: { id: 1, username: "Fallback User" },
            action: "None",
            post_to_dc: "Yes",
            post_to_call_shaper: "No",
            insert_to_postgres: "Yes",
          },
          {
            id: 2,
            name: "Fallback File 2",
            credentials: { id: 2, name: "market" },
            remote_path: "/remote/path/2",
            created_at: "2025-06-08",
            created_by: { id: 2, username: "Backup User" },
            action: "None",
            post_to_dc: "Yes",
            post_to_call_shaper: "No",
            insert_to_postgres: "Yes",
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
  }, [
    selectedCredential,
    filterInsertPostgres,
    filterPostCallShaper,
    filterPostDC,
  ]);

  console.log("SELECTED FILTER", selectedCredential);
  useEffect(() => {
    const fetchFilter = async () => {
      const res = getCredentialsFilters();
      res
        .then((data) => {
          console.log(data);
          setCredentialsFilters(data?.data);
        })
        .catch((error) => {
          throw error;
        });
    };
    fetchFilter();
  }, []);

  const columns: ColumnsType<FileDownloadDefinitionItem> = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link to="/FileDownloadDefinition/change" state={{ record }}>
          {text}
        </Link>
      ),
    },
    {
      title: "CREDENTIALS",
      dataIndex: "credentials",
      key: "credentials",
      render: (credentials) => credentials?.name,
    },
    { title: "REMOTE PATH", dataIndex: "remote_path", key: "remote_path" },
    { title: "CREATED AT", dataIndex: "created_at", key: "created_at" },
    {
      title: "CREATED BY",
      dataIndex: "created_by",
      key: "created_by",
      render: (created_by) => created_by?.username,
    },
    {
      title: "POST TO DC",
      dataIndex: "post_to_dc",
      key: "post_to_dc",
    },
    {
      title: "POST TO CALL SHAPER",
      dataIndex: "post_to_call_shaper",
      key: "post_to_call_shaper",
    },
    {
      title: "INSERT TO POSTGRES",
      dataIndex: "insert_to_postgres",
      key: "insert_to_postgres",
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      render: (record: FileDownloadDefinitionItem) => (
        <a href={record.remote_path} target="_blank" rel="noopener noreferrer">
          Download File
        </a>
      ),
    },
    {
      title: "",
      key: "edit",
      render: (_: any, record) => (
        <Button
          type="primary"
          onClick={() =>
            navigate("/FileDownloadDefinition/change", { state: { record } })
          }
        >
          Edit
        </Button>
      ),
    },
    {
      title: "",
      key: "delete",
      render: (_: any, record) => (
        <Popconfirm
          title="Are you sure to delete this File?"
          onConfirm={() => handleDelete(record.id!)}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<Trash2 size={16} />} danger />
        </Popconfirm>
      ),
    },
  ];

  const postDCOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];
  const postCallShaperOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const InsertPGOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
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

          <div className="overflow-x-auto">
            <Table
              columns={columns}
              dataSource={filteredData}
              // rowSelection={{ type: "checkbox" }}
              bordered
              loading={loading}
              scroll={{ x: "max-content" }}
            />
          </div>
        </div>

        <div className="lg:col-span-3 w-full">
          <FilterCardWrapper>
            <FilterDropdown
              title="By Credentials"
              options={credentialsFilters}
              onChange={(value) => setSelectedCredential(value)}
              type="id-value"
              value={selectedCredential}
            />
            <FilterDropdown
              title="By Post DC"
              options={postDCOptions}
              onChange={(value) => setFilterPostDC(value)}
              value={filterPostDC}
            />
            <FilterDropdown
              title=" By post to call shaper"
              options={postCallShaperOptions}
              onChange={(value) => setFilterPostCallShaper(value)}
              value={filterPostCallShaper}
            />
            <FilterDropdown
              title=" By insert to postgres"
              options={InsertPGOptions}
              onChange={(value) => setFilterInsertPostgres(value)}
              value={filterInsertPostgres}
            />
          </FilterCardWrapper>
        </div>
      </div>
    </div>
  );
};

export default FileDownloadDefinition;
