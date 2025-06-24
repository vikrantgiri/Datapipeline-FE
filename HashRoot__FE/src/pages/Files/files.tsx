import { useState, useEffect } from "react";
import { Button, Table, Popconfirm } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import HeadingWithButton from "../../components/Heading-button";
// import { mockFilesData, type FileData } from "./data";
import type { ColumnsType } from "antd/es/table";
import { Trash2 } from "lucide-react";
import client from "../../api/axiosInstance";


export interface FileData {
  id: number;
  // key: string;
  file: string;
  type: string;
  status: string;
  uploaded_at: string;
  // uploaded_by: string;
  user: {
    id: number;
    username: string;
  };
  download?: string;
}


const Files = () => {
  const [selectedSource] = useState("All");

    const [data, setData] = useState<FileData[]>([]);
    const [loading, setLoading] = useState(false);

  // const data: FileData[] = mockFilesData;

  // const handleDelete = (id: number) => {
  //   setData((prev) => prev.filter((item) => item.id !== id));
  // };

  const filteredData = data.filter((item) => {
    const fileName = item.file.split("\\").pop()?.toLowerCase() || "";
    const matchesSearch = fileName.includes("");
    const matchesFilter =
      selectedSource === "All" || item.file === selectedSource;
    return matchesSearch && matchesFilter;
  });



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // throw new Error("Simulated failure");

        const res = await client.get(`/file`);
        console.log(res?.data?.data);
        setData(res?.data?.data?.data);
      } catch (error) {
        console.log("Failed to fetch files", error);
        const fallbackData: FileData[] = [
          {
            id: 1,
            file: "filepath-fallback",
            type: "Unspecified",
            status: "Processed",
            uploaded_at: "2024-05-22",
            user: { id: 1, username: "System" },
            download: "Download Link",
          },
          {
            id: 2,
            file: "filepath-fallback",
            type: "Unspecified",
            status: "Processed",
            uploaded_at: "2024-05-21",
            user: { id: 2, username: "Admin" },
            download: "Download Link",
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

  const columns: ColumnsType<FileData> = [
    {
      title: "File",
      dataIndex: "file",
      key: "file",

      render: (text: string, record: FileData) => (
        <span className="text-blue-600">
          {/* state={{ record }} */}
          {text.split("\\").pop()}
        </span>
      ),
    },
    { title: "TYPE", dataIndex: "type", key: "type" },
    { title: "STATUS", dataIndex: "status", key: "status" },
    {
      title: "UPLOADED AT",
      dataIndex: "uploaded_at",
      key: "uploaded_at",
    },
    {
      title: "UPLOADED BY",
      dataIndex: "user",
      key: "user",
      render: (user) => user?.username,
    },
    {
      title: "DOWNLOAD",
      dataIndex: "download",
      key: "download",

      render: (text: string) => (
        <a href="#" className="text-blue-500 hover:underline">
          {text || "Download"}
        </a>
      ),
    },
    // {
    //   title: "",
    //   key: "delete",
    //   render: (_, record) => (
    //     <Popconfirm
    //       title="Are you sure to delete this Log?"
    //       onConfirm={() => handleDelete(record.id)}
    //       okText="Yes"
    //       cancelText="No"
    //     >
    //       <Button icon={<Trash2 size={16} className="text-red-600" />} danger />
    //     </Popconfirm>
    //   ),
    // },
  ];

  return (
    <>
      <HeadingWithButton
        heading="Select Files to change"
        // buttonText="Add File"
        buttonColor="primary"
        buttonIcon={<PlusOutlined />}
        to="/Files/add"
      />

      <div className="lg:col-span-9 w-full">
        {/* <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <span className="text-sm text-gray-600">
            {filteredData.length} File Download Definition found
          </span>
          <Button icon={<DeleteOutlined />} danger>
            Delete Selected
          </Button>
        </div> */}

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
    </>
  );
};

export default Files;
