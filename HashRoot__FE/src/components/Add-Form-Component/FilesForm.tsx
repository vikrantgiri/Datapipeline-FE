import React, { useEffect } from 'react';
import {
  Form,
  
  Select,
  Button,
  
  Typography,
  Upload,
} from 'antd';
import {

  UploadOutlined,
} from '@ant-design/icons';

const { Option } = Select;
const {  Text } = Typography;

interface FilesFormProps {
  form: any;
  credentialOptions?: string[];
  userOptions?: string[];
  onSubmit: (values: any) => void;
  initialValues?: any;
}

const FilesForm: React.FC<FilesFormProps> = ({
  form,
  onSubmit,
  initialValues = {},
  userOptions = [],
}) => {
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);
  // const [form] = Form.useForm();

  return (
    <>
   
    <div className="max-h-[600px] overflow-y-auto p-4 bg-white rounded ">
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmit}
      className="text-black p-6 rounded space-y-6"
    >
      <Form.Item label="Status" name="status">
        <Select placeholder="Pending">
          <Option value="Pending">Pending</Option>
          <Option value="Process">Process</Option>
          <Option value="Failed">Failed</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Source" name="source">
        <Select placeholder="--------">
          <Option value="ExperianPrescreenDataGateway">Experian Prescreen Data Gateway</Option>
          <Option value="TransUnionDataGateway">TransUnion Data Gateway</Option>
          <Option value="MarketingPostgres">Marketing Postgres</Option>
          <Option value="Snowflakes">Snowflakes</Option>
          <Option value="ExperianTrigger">Experian Trigger</Option>
          <Option value="ExperianInputField">Experian Input Field</Option>
          <Option value="unknown">None</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Type" name="type">
        <Select placeholder="Unspecified">
          <Option value="prescreen">Prescreen</Option>
          <Option value="trigger">Trigger</Option>
          <Option value="unspecified">Unspecified</Option>
        </Select>
      </Form.Item>

      <Form.Item label="File" name="file" valuePropName="file">
        <Upload beforeUpload={() => false} maxCount={1}>
          <Button icon={<UploadOutlined />}>Choose File</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Uploaded by" name="uploaded_by">
        <Select placeholder="--------">
          {userOptions.map((user) => (
            <Option key={user} value={user}>{user}</Option>
          ))}
        </Select>
      </Form.Item>

     
      <Text >Download:</Text>    <Text>-</Text>

    </Form>
    </div>
    <div className="flex gap-4 pt-4">
          <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
            SAVE
          </Button>
          <Button>Save and add another</Button>
          <Button>Save and continue editing</Button>
          <Button onClick={() => form.resetFields()}>Reset</Button>
        </div>
     </>
  );
};

export default FilesForm;
