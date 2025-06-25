
import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';

const TaskStatusForm: React.FC<{ onSubmit: (values: any) => void; initialValues?: any }> = ({
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
      <Form.Item name="taskLog" label="Task Log" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="download" label="Download" rules={[{ required: true }]}>
        <Input />
      </Form.Item>


      <Form.Item name="createdAt" label="Created At">
        <Input />
      </Form.Item>

    <Form.Item name="updatedAt" label="Upadated At">
        <Input  />
      </Form.Item>

      <Form.Item name="createdBy" label="Created By">
        <Input />
      </Form.Item>

       <Form.Item name="status" label="Status" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

    <Form.Item name="taskDefinition" label="Task definition" rules={[{ required: true }]}>
        <Input />
      </Form.Item>



      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskStatusForm;
