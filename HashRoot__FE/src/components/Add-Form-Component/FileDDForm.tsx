import React from 'react';
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Divider,
  Typography,
} from 'antd';
import {
  EyeInvisibleOutlined,
  PlusOutlined,
  EditOutlined,
} from '@ant-design/icons';

const { Option } = Select;
const { Title, Text } = Typography;

interface FileDownloadFormProps {
  credentialOptions?: string[];
  onSubmit: (values: any) => void;
  initialValues?: any;
}

const FileDownloadForm: React.FC<FileDownloadFormProps> = ({
  onSubmit,
  initialValues = {},
}) => {
  const [form] = Form.useForm();

  return (
    <>
    <div className="max-h-[600px] overflow-y-auto p-4 bg-white rounded ">
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmit}
      className="text-black p-6 rounded  space-y-6"
    >
      <Form.Item label="Type" name="type">
        <Select placeholder="Select type">
          <Option value="unknown">Unknown</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>

      <Form.Item label="Credentials" name="credentials">
        <Input
          type="password"
          suffix={
            <>
              <EditOutlined style={{ marginRight: 8 }} />
              <PlusOutlined style={{ marginRight: 8 }} />
              <EyeInvisibleOutlined />
            </>
          }
        />
      </Form.Item>

      <Form.Item label="Remote path" name="remotePath">
        <Input placeholder="Path to remote file location for data gateway" />
      </Form.Item>

      <Form.Item name="postToDC" valuePropName="checked">
        <Checkbox>Post to dc</Checkbox>
      </Form.Item>

      <Form.Item label="DC lead key" name="dcLeadKey">
        <Input />
      </Form.Item>

      <Form.Item label="DC lead token" name="dcLeadToken">
        <Input />
      </Form.Item>

      <Form.Item name="postToCallShaper" valuePropName="checked">
        <Checkbox>Post to call shaper</Checkbox>
      </Form.Item>

      <Form.Item name="appendPhone" valuePropName="checked">
        <Checkbox>Append phone no</Checkbox>
      </Form.Item>

      <Form.Item name="appendEmail" valuePropName="checked">
        <Checkbox>Append email</Checkbox>
      </Form.Item>

      <Form.Item name="appendHomeValue" valuePropName="checked">
        <Checkbox>Append home value</Checkbox>
      </Form.Item>

      <Form.Item name="appendPincode" valuePropName="checked">
        <Checkbox>Append pincode</Checkbox>
      </Form.Item>

      <Form.Item name="insertToPostgres" valuePropName="checked">
        <Checkbox>Insert to postgres</Checkbox>
      </Form.Item>

      <Divider />

      <Text type="secondary">Created at:</Text> <Text>-</Text>
      <br /><br/>
      <Text type="secondary">Updated at:</Text> <Text>-</Text>
      <br /><br/>
      <Text type="secondary">Created by:</Text> <Text>-</Text>

      <Divider />

      <Title level={5}>File Download Statuses</Title>
      <div className="bg-blue-500 text-white p-2 grid grid-cols-5 gap-2">
        <span>TASK LOGS</span>
        <span>STATUS</span>
        <span>CREATED AT</span>
        <span>CREATED BY</span>
        <span>UPDATED AT</span>
      </div>
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

export default FileDownloadForm;
