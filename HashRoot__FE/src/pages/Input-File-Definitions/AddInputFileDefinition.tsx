import React, { useState } from "react";
import { Form } from "antd";
import InputFileForm from "../../components/Add-Form-Component/InputFileDForm";

const AddInputFileDefinition: React.FC = () => {

  const [form] = Form.useForm();
  const [inputFiles, setInputFiles] = useState<any[]>([]);


  const handleFinish = (values: any) => {
    console.log("Payload :", values);


    const newInputFile = {
      key: inputFiles.length + 1,
      ...values,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
    };
    setInputFiles([newInputFile, ...inputFiles]);

    form.resetFields();
  };

  return (
    <div className="text-black">
      <h1 className="text-2xl font-semibold mb-6">Add Input File Definition</h1>
     
      <InputFileForm form={form} onFinish={handleFinish} />
    </div>
  );
};

export default AddInputFileDefinition;
