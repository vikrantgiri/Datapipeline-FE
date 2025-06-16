import { useEffect, useState } from "react";
import { Button, Input, Table, Popconfirm,message } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import HeadingWithButton from "../../components/Heading-button";
import FileDDFilter from "../../components/Filter/FileDDFilter";
import { Trash2 } from "lucide-react";
import client from "../../api/axiosInstance";
// import {
//   fileDownloadDefinitionData,
//   type FileDownloadDefinitionItem,
// } from "./data";

const { Search } = Input;

export interface FileDownloadDefinitionItem {
 id:number;
  // key: string;
  name: string;
  credentials: string;
  remote_path: string;
  created_at: string;
  created_by: {
    id: number;
    username: string;
  };
  action: string;

  postDC: string;
  postCallShaper: string;
  insertPostgres: string;
}

const FileDownloadDefinition = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [showCounts, setShowCounts] = useState(true);

  const [data, setData] = useState<FileDownloadDefinitionItem[]>([]);
  const [loading, setLoading] = useState(false);

  // const handleDelete = (id: number) => {
  //   setData((prev) => prev.filter((item) => item.id !== id));
  // };

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

  const [filterCredentials, setFilterCredentials] = useState("All");
  const [filterPostDC, setFilterPostDC] = useState("All");
  const [filterPostCallShaper, setFilterPostCallShaper] = useState("All");
  const [filterInsertPostgres, setFilterInsertPostgres] = useState("All");

  // const filteredData = fileDownloadDefinitionData.filter((item) => {
  //   const matchesSearch = item.name
  //     .toLowerCase()
  //     .includes(searchText.toLowerCase());

  //   const matchesCredentials =
  //     filterCredentials === "All" || item.credentials === filterCredentials;

  //   const matchesPostDC =
  //     filterPostDC === "All" || item.postDC === filterPostDC;

  //   const matchesCallShaper =
  //     filterPostCallShaper === "All" ||
  //     item.postCallShaper === filterPostCallShaper;

  //   const matchesInsertPostgres =
  //     filterInsertPostgres === "All" ||
  //     item.insertPostgres === filterInsertPostgres;

  //   return (
  //     matchesSearch &&
  //     matchesCredentials &&
  //     matchesPostDC &&
  //     matchesCallShaper &&
  //     matchesInsertPostgres
  //   );
  // });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // throw new Error("Simulated failure");

        const res = await client.get(`/file-download-def`);
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
            postDC: item.post_to_dc ? "Yes" : "No",
            postCallShaper: item.post_to_call_shaper ? "Yes" : "No",
            insertPostgres: item.insert_to_postgres ? "Yes" : "No",
          }))
        );
      } catch (error) {
        console.log("Failed to fetch file download definition", error);
        const fallbackData: FileDownloadDefinitionItem[] = [
          {
            id: 1,
            name: "Fallback File 1",
            credentials: "TransUnion Data Gateway",
            remote_path: "/remote/path/1",
            created_at: "2025-06-09",
            created_by: { id: 1, username: "Fallback User" },
            action: "None",
            postDC: "Yes",
            postCallShaper: "No",
            insertPostgres: "Yes",
          },
          {
            id: 2,
            name: "Fallback File 2",
            credentials: "Marketing Postgres",
            remote_path: "/remote/path/2",
            created_at: "2025-06-08",
            created_by: { id: 2, username: "Backup User" },
            action: "None",
            postDC: "No",
            postCallShaper: "Yes",
            insertPostgres: "No",
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
    {
      title: "",
      key: "delete",
      render: (_, record) => (
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
              {/* {filteredData.length} File Download Definition found */}
            </span>
            <Button icon={<DeleteOutlined />} danger>
              Delete Selected
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table
           
              columns={columns}
              dataSource={data}
              // rowSelection={{ type: "checkbox" }}
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
