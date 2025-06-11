import React from 'react';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

interface CredentialsFormProps {
  form: any;
  onFinish: (values: any) => void;
}

const CredentialsForm: React.FC<CredentialsFormProps> = ({ form, onFinish }) => {
  return (
    <>
    <div className="max-h-[600px] overflow-y-auto p-4 bg-white rounded ">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-4"
      >
        <Form.Item name="third_party" label="Third party:">
          <Select placeholder="--------">
            <Option value="TransUnion">TransUnion</Option>
            <Option value="Experian">Experian</Option>
            <Option value="Other">Other</Option>
            <Option value="Snowflake">Snowflake</Option>
            <Option value="Postgres">Postgres</Option>
            <Option value="DemandConversions">DemandConversions</Option>
          </Select>
        </Form.Item>

        <Form.Item name="name" label="Name:">
          <Input />
        </Form.Item>

        <Form.Item name="host" label="Host:">
          <Input />
        </Form.Item>

        <Form.Item name="database" label="Database:">
          <Input />
        </Form.Item>

        <Form.Item name="username" label="Username:">
          <Input />
        </Form.Item>

        <Form.Item name="password" label="Password:">
          <Input.Password />
        </Form.Item>

        <Form.Item name="port" label="Port:">
          <Input type="number" />
        </Form.Item>

        <Form.Item name="created_by" label="Created by:">
          <Select placeholder="--------">
            <Option value="admin">admin</Option>
            <Option value="system">system</Option>
          </Select>
        </Form.Item>

        <Form.Item name="createdAt" label="Created at">
          <Input />
        </Form.Item>

        <Form.Item name="UpdatedAt" label="Updated at:">
          <Input />
        </Form.Item>

        
      </Form>
    </div>
    <div className="flex gap-4 pt-4">
          <Button type="primary" htmlType="submit">
            SAVE
          </Button>
          <Button>Save and add another</Button>
          <Button>Save and continue editing</Button>
          <Button onClick={() => form.resetFields()}>Reset</Button>
        </div>
        </>
  );
};

export default CredentialsForm;

