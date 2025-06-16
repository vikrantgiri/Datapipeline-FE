import React, { useState } from "react";
import { Table, Form, message } from "antd";
import client from "../../api/axiosInstance";
import CredentialsForm from "../../components/Add-Form-Component/CredentialsForm";

const AddCredentials: React.FC = () => {
  const [form] = Form.useForm();
  const [credentials, setCredentials] = useState<any[]>([]);

  const handleFinish = async (values: any) => {
    console.log("Payload :", values);

    try {
    
      const res = await client.post("/credentials", values);
  
      const newCredential = res.data;

   
      newCredential.key = credentials.length + 1;
      newCredential.createdAt = new Date().toLocaleString();
      newCredential.updatedAt = new Date().toLocaleString();

      setCredentials([newCredential, ...credentials]);

      form.resetFields();

      message.success("Credential successfully added.");
    } catch (error) {
      console.error(error);
      message.error("Failed to add credential.");
    }
  };

  // const columns = [
  //   { title: "Third Party", dataIndex: "third_party", key: "third_party" },
  //   { title: "Name", dataIndex: "name", key: "name" },
  //   { title: "Host", dataIndex: "host", key: "host" },
  //   { title: "Database", dataIndex: "database", key: "database" },
  //   { title: "Username", dataIndex: "username", key: "username" },
  //   { title: "Port", dataIndex: "port", key: "port" },
  //   { title: "Created By", dataIndex: "created_by_id", key: "created_by_id" },
  //   { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
  //   { title: "Updated At", dataIndex: "UpdatedAt", key: "UpdatedAt" },
  // ];

  return (
    <div className="text-gray-900">
      <h1 className="text-2xl font-semibold mb-6">Add Credential</h1>

      <div className="pr-4">
        <CredentialsForm form={form} onFinish={handleFinish} />
      </div>

      {credentials.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl mb-4">Saved Credentials</h2>

          {/* <Table
            dataSource={credentials}
            columns={columns}
            pagination={{ pageSize: 5 }}
            scroll={{ x: true }}
            className="bg-gray-50 rounded p-4"
          /> */}
        </div>
      )}
    </div>
  );
};

export default AddCredentials;
