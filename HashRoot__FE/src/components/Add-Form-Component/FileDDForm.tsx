import React, { useEffect,useState } from "react";
import { Form, Input, Button,Select } from "antd";

import client from "../../api/axiosInstance";
const { Option } = Select;

interface FileDownloadFormProps {
  form: any;
  onFinish: (values: any) => void;
  initialValues?: any;
}

const FileDownloadForm: React.FC<FileDownloadFormProps> = ({
  form,
  onFinish,
  // initialValues,
}) => {
 const [credentialsOptions, setCredentialsOptions] = useState<any[]>([]);

  useEffect(() => {
    // if (initialValues) {
    //   form.setFieldsValue(initialValues);

   
    const fetchCredentials = async () => {
      try {
       
        const res = await client.get("/user/get-user-filters");

        if (res?.data?.error == null) {
          setCredentialsOptions(res.data.data);
          console.log("Credentials fetched!", res.data.data);
        }
      } catch (error) {
        console.error("Error fetching .", error);
      }
    };
    fetchCredentials();
  }, []);
//   [initialValues, form]
// );

  return (
    <Form form={form} layout="vertical" onFinish={(values) => onFinish(values)}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter a name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="credentials"
        label="Credentials"
        rules={[{ required: true, message: "Please enter credentials" }]}
      >
        <Select placeholder="--------">
          {credentialsOptions.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.username}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="remote_path"
        label="Remote Path"
        rules={[{ required: true, message: "Please enter a remote path" }]}
      >
        <Input />
      </Form.Item>
      {/* 
      <Form.Item name="created_at" label="Created At">
        <Input disabled />
      </Form.Item>

      <Form.Item name="created_by" label="Created By">
        <Input disabled />
      </Form.Item> */}

      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
          Save File Download Definition
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FileDownloadForm;
