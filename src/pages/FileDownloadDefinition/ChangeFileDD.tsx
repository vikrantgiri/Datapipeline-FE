import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FileDownloadForm from "../../components/Add-Form-Component/FileDDForm";
import { Form, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import client from "../../api/axiosInstance";

const ChangeFileDD: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { record } = location.state || {};
  const [form] = Form.useForm();

  // useEffect(() => {
  //   if (record) {
  //     form.setFieldsValue({
  //       ...record,
  //       credentials: record.credentials?.name,
  //       user: record.user?.username,
  //     });
  //   }
  // }, [record]);

  console.log(record);

  const getElementById = async (id: any) => {
    try {
      const res = await client.get(`/file-download-def/${id}`);
      const item = res.data.data;
      console.log(item);
      form.setFieldsValue({
        ...item,
        credentials: item?.credentials?.id,
      });
      message.success("Record fetched.");
    } catch (error) {
      console.error("Failed to fetch.", error);
      message.error("Failed to fetch.");
    }
  };

  useEffect(() => {
    if (record?.key) {
      getElementById(record.key);
    }
  }, [record?.key]);

  const handleFinish = async (values: any) => {
    try {
      await client.put(`/file-download-def/${record.key}`, values);
      message.success("File Download Definition updated successfully.");
      navigate("/FileDownloadDefinition");
    } catch (error) {
      console.error("Failed to update.", error);
      message.error("Failed to update File Download Definition.");
    }
  };

  return (
    <div className="text-black">
            <div className="flex items-center gap-2 mb-6">
              <ArrowLeftOutlined
                className="text-xl cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => navigate("/FileDownloadDefinition")}
              />
      <h1 className="text-2xl text-black font-semibold ">
        Change File Download Definition
      </h1>
      </div>
      <div className="pr-4"></div>

      <FileDownloadForm
        form={form}
        onFinish={handleFinish}
        // initialValues={record}
      />
    </div>
  );
};

export default ChangeFileDD;
