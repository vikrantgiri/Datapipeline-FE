// 

import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';

const FileDownloadForm: React.FC<{ onSubmit: (values: any) => void; initialValues?: any }> = ({
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleFinish = (values: any) => {
    onSubmit(values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="credentials" label="Credentials" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="remotepath" label="Remote Path" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="createdAt" label="Created At">
        <Input  />
      </Form.Item>

      <Form.Item name="createdBy" label="Created By">
        <Input   />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FileDownloadForm;
