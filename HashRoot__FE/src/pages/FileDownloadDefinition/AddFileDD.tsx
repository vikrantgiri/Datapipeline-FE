import React, { useState } from "react";
import { Form } from "antd";

import FileDownloadForm from "../../components/Add-Form-Component/FileDDForm";

const AddFileDD: React.FC = () => {
  const [form] = Form.useForm();
  const [fileDD, setFileDD] = useState<any[]>([]);

  const handleFinish = (values: any) => {
    console.log("Payload :", values);

    // Here you could send this to your API if needed
    // postFileDownloadDefinitions(values)

    
    const newFileDD = {
      key: fileDD.length + 1,
      ...values,
      created_at: new Date().toLocaleString(), 
      updated_at: new Date().toLocaleString(), 
    };
    setFileDD([newFileDD, ...fileDD]);

    form.resetFields();
  };

  return (
    <div className="text-gray-900">
      <h1 className="text-2xl font-semibold mb-6">
        Add File Download Definition
      </h1>

      <div className="pr-4">
        <FileDownloadForm form={form} onFinish={handleFinish} />
      </div>

      {/* Uncomment this if you want to show a table with added files
      <Table dataSource={fileDD} columns={columns} pagination={{ pageSize: 5 }} />
      */}
    </div>
  );
};

export default AddFileDD;
