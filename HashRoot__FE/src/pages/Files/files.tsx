import { useState } from "react";
import { Button, Table } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import MainLayout from "../../layout/MainLayout";
import HeadingWithButton from "../../components/Heading-button";
import { mockFilesData, type FileData } from "./data";

const Files = () => {
  const [selectedSource] = useState("All");

  const data: FileData[] = mockFilesData;

  const filteredData = data.filter((item) => {
    const fileName = item.file.split("\\").pop()?.toLowerCase() || "";
    const matchesSearch = fileName.includes(""); 
    const matchesFilter =
      selectedSource === "All" || item.file === selectedSource;
    return matchesSearch && matchesFilter;
  });

  const columns = [
    {
      title: "File",
      dataIndex: "file",
      key: "file",
      width: 200,
      render: (text: string) => (
        <span className="text-blue-600">{text.split("\\").pop()}</span>
      ),
    },
    { title: "TYPE", dataIndex: "type", key: "type", width: 150 },
    { title: "STATUS", dataIndex: "status", key: "status", width: 150 },
    { title: "UPLOADED AT", dataIndex: "uploadedAt", key: "uploadedAt", width: 180 },
    { title: "UPLOADED BY", dataIndex: "uploadedBy", key: "uploadedBy", width: 180 },
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
  ];

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <HeadingWithButton
          heading="Select Files to change"
          buttonText="Add File"
          buttonColor="primary"
          buttonIcon={<PlusOutlined />}
          to="/Files/add"
        />

        <div className="lg:col-span-9 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <span className="text-sm text-gray-600">
              {filteredData.length} File Download Definition found
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

export default Files;
