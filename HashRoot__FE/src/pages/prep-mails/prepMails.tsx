import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Table } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import HeadingWithButton from "../../components/Heading-button/index";
import { mockPrepMails, type PrepMail } from "./data";

// const { Search } = Input;

const PrepMails = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [selectedSource, setSelectedSource] = useState("All");

  const data: PrepMail[] = mockPrepMails;

  const filteredData = data.filter((item) => {
    const matchesSearch = item.id
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesFilter =
      selectedSource === "All" || item.createdBy === selectedSource;
    return matchesSearch && matchesFilter;
  });

  const columns = [
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
    { title: "CREATED BY", dataIndex: "createdBy", key: "createdBy" },
    { title: "CREATED AT", dataIndex: "createdAt", key: "createdAt" },
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
            dataSource={filteredData}
            rowSelection={{ type: "checkbox" }}
            bordered
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PrepMails;
