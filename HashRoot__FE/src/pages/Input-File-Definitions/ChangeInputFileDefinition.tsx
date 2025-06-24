import React, { useEffect } from "react";
import { Form, message } from "antd";
import InputFileForm from "../../components/Add-Form-Component/InputFileDForm";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import client from "../../api/axiosInstance";

const ChangeInputFileDefinition: React.FC = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { record } = location.state || {};

  // useEffect(() => {
  //   if (record) {
  //     console.log("RECORD", record);
  //    form.setFieldsValue(record);
  //   }
  // }, [record]);

  useEffect(() => {
    if (record?.id) {
      getElementById(record.id);
    }
  }, [record?.id]);

  const getElementById = async (id: any) => {
    try {
      const res = await client.get(`/input-file-def/${id}`);
      const item = res.data.data;
      console.log(item);
      form.setFieldsValue({
        ...item,
        credentials: item.credentials?.name,
      });
      console.log(form.getFieldsValue());
      message.success("Record fetched.");
    } catch (error) {
      console.error("Failed to fetch.", error);
      message.error("Failed to fetch.");
    }
  };

  const handleFinish = async (values: any) => {
    try {
      const res = await client.put(`/input-file-def/${record.id}`, values);
      message.success("Input File Definition updated successfully.");
      if (res.status == 200) {
        navigate("/InputFileDefinitions");
      }
    } catch (error) {
      console.error("Failed to update.", error);
      message.error("Failed to update Input File Definition.");
    }
  };

  return (
    <div className="text-black">
      <div className="flex items-center gap-2 mb-6">
        <ArrowLeftOutlined
          className="text-xl cursor-pointer text-blue-600 hover:text-blue-800"
          onClick={() => navigate("/InputFileDefinitions")}
        />
        <h1 className="text-2xl font-semibold ">
          Change Input File Definition
        </h1>
      </div>
      <InputFileForm form={form} onFinish={handleFinish} />
    </div>
  );
};

export default ChangeInputFileDefinition;
