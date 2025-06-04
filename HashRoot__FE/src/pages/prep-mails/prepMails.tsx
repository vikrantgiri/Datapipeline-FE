import { useState } from "react";
import { Button,  Table } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
 
} from "@ant-design/icons";
import MainLayout from "../../layout/MainLayout";
import HeadingWithButton from "../../components/Heading-button/index";
import { mockPrepMails, type PrepMail } from "./data";

// const { Search } = Input;

const PrepMails = () => {
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
      render: (text: string) => <span className="text-blue-600">{text}</span>,
    },
     { title: "CREATED BY", dataIndex: "createdBy", key: "createdBy" },
    { title: "CREATED AT", dataIndex: "createdAt", key: "createdAt" },
     { title: "Run Trigger", dataIndex: "runTrigger", key: "runTrigger" },
      { title: "Download Results", dataIndex: "downloadResult", key: "downloadResult" },
   
  ];

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
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
    </MainLayout>
  );
};

export default PrepMails;
