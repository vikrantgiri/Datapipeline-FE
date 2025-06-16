import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { Button, Table, Popconfirm,message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import HeadingWithButton from "../../components/Heading-button/index";
// import { mockPrepMails, type PrepMail } from "./data";
import type { ColumnsType } from "antd/es/table";
import { Trash2 } from "lucide-react";
import client from "../../api/axiosInstance";



export interface PrepMail {
  key: string;
  id: number;
  username?:string;
 created_at: string;
 created_by: string;
  runTrigger: string;
  downloadResult: string;
}

const PrepMails = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [selectedSource, setSelectedSource] = useState("All");

  // const data: PrepMail[] = mockPrepMails;

    const [data, setData] = useState<PrepMail[]>([]);
    const [loading, setLoading] = useState(false);
    
    // const handleDelete = (id: number) => {
    //   setData((prev) => prev.filter((item) => item.id !== id));
    // };

      const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await client.delete(`/prep-mail/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));

      message.success("Credential successfully deleted.");
    } catch (error) {
      console.error("Error while delete.", error);
      message.error("Failed to delete credential.");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter((item) => {
    const matchesSearch = item.id.toString().includes(searchText);
    const matchesFilter =
      selectedSource === "All" || item.created_by=== selectedSource;
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await client.get(`/prep-mail`);
        console.log(res?.data?.data);
        setData(res?.data?.data?.data);
      } catch (error) {
        console.log("Failed to fetch prep mails", error);
        const fallbackData: PrepMail[] = [
          {
            key: "1",
            id: 1,

           created_at: "2024-05-22",
           created_by: "System",
            runTrigger: "Run Trigger",
            downloadResult: "Download CSV",
          },
          {
            key: "2",
            id: 2,

           created_at: "2024-05-21",
           created_by: "Admin",
            runTrigger: "Run Trigger",
            downloadResult: "Download CSV",
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

  const columns: ColumnsType<PrepMail> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string, record: PrepMail) => (
        <Link
          to={{
            pathname: "/PrepMails/change",
          }}
          state={{ record }}
          className="text-blue-600"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "CREATED BY",
      dataIndex: "username",
      key: "username",
     
    },
    { title: "CREATED AT", dataIndex: "created_at", key: "created_at" },
    {
      title: "Run Trigger",
      dataIndex: "runTrigger",
      key: "runTrigger",
      render: (_: any, record: PrepMail) => (
        <Link
          to={{
            pathname: "/PrepMails/run-trigger",
          }}
          state={{ record }}
          className="text-green-600 underline"
        >
          Run Trigger
        </Link>
      ),
    },
    {
      title: "Download Results",
      dataIndex: "downloadResult",
      key: "downloadResult",
      render: (_: any, record: PrepMail) => (
        <Link
          to={{
            pathname: "/PrepMails/download-results",
          }}
          state={{ record }}
          className="text-blue-600 underline"
        >
          Download CSV
        </Link>
      ),
    },
    {
      title: "",
      key: "edit",
      render: (_: any) => (
        <Button type="primary" onClick={() => navigate("/PrepMails/change")}>
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
    <div className="">
      <HeadingWithButton
        heading="Select prep mail to change"
        buttonText="Add Prep Mails"
        buttonColor="primary"
        buttonIcon={<PlusOutlined />}
        to="/PrepMails/add"
      />
      <div className="lg:col-span-9 w-full">
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
            dataSource={data}
            // rowSelection={{ type: "checkbox" }}
            bordered
            loading={loading}
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PrepMails;
