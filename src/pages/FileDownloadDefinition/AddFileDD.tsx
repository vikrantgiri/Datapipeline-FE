import React, { useState } from "react";
import { Form ,message} from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import client from "../../api/axiosInstance";
import FileDownloadForm from "../../components/Add-Form-Component/FileDDForm";

const AddFileDD: React.FC = () => {
  const [form] = Form.useForm();
  const [fileDD, setFileDD] = useState<any[]>([]);
  const navigate = useNavigate();


  const handleFinish = async (values: any) => {
    console.log("Payload :", values);

    try {
      const res = await client.post("/file-download-def", values);

      const newfileDD = res.data;

      newfileDD.key = fileDD.length + 1;
      newfileDD.createdAt = new Date().toLocaleString();
      newfileDD.updatedAt = new Date().toLocaleString();

      setFileDD([newfileDD, ...fileDD]);

      form.resetFields();
message.success("File Download Definition  successfully added.");
navigate("/FileDownloadDefinition"); 
    } catch (error) {
      console.error(error);
      message.error("Failed to add file download definition.");
    }

  };
  return (
    <div className="text-gray-900">
       <div className="flex items-center gap-2 mb-6">
              <ArrowLeftOutlined
                className="text-xl cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => navigate("/FileDownloadDefinition")}
              />
      <h1 className="text-2xl font-semibold ">
        Add File Download Definition
      </h1>
      </div>

      <div className="pr-4">
        <FileDownloadForm form={form} onFinish={handleFinish} />
      </div>

    
    </div>
  );
};

export default AddFileDD;
