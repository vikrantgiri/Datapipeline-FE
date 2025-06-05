import React, { useEffect } from "react";
import { Form, Input, Button, Select,Typography , Divider} from "antd";


const { Option } = Select;
const { TextArea } = Input;
const {  Text,Title } = Typography;

const InputFileForm: React.FC<{ onSubmit: (values: any) => void ,initialValues?: any }> = ({ onSubmit ,initialValues,}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  const handleFinish = (values: any) => {
    onSubmit(values);
  };

  return (
    <>
   
    <div className="max-h-[600px] overflow-y-auto p-4 bg-white rounded ">
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className="text-black p-6 rounded space-y-6"
    >
      <Form.Item label="Task Type" name="tasktype" rules={[{ required: true }]}>
        <Select placeholder="---------">
          <Option value="Prescreen">Prescreen</Option>
          <Option value="Trigger">Trigger</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Campaign type" name="campaignType" rules={[{ required: true }]}>
        <Select placeholder="unspecified">
          <Option value="hecm">HECM to HECM</Option>
          <Option value="firstTimeReverse">First Time Reverse</Option>
          <Option value="unspecified">Unspecified</Option>
        </Select>
      </Form.Item>

      <Form.Item name="third_party" label="Third party:">
        <Select placeholder="--------">
          <Option value="TransUnion">TransUnion</Option>
          <Option value="Experian">Experian</Option>
          <Option value="Other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Credentials" name="credentials">
        <Select placeholder="----------">
          <Option value="TransUnion">TransUnion</Option>
          <Option value="Experian">Experian</Option>
          <Option value="Other">Other</Option>
          <Option value="Snowflake">Snowflake</Option>
          <Option value="Postgres">Postgres</Option>
          <Option value="DemandConversions">DemandConversions</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Max column size (bytes)" name="max_column_size">
        <Input type="number" placeholder="e.g. 44" />
      </Form.Item>

      <Form.Item label="Remote path" name="remote_path">
        <Input placeholder="" />
      </Form.Item>

      <Form.Item label="Custom filename" name="custom_filename">
        <Input placeholder="" />
      </Form.Item>

      <Form.Item label="SQL script" name="sql_script">
        <TextArea placeholder="" rows={4} />
      </Form.Item>

      <Form.Item label="Use tabu" name="use_tabu">
        <Select placeholder="No">
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Bucketize" name="bucketize">
        <Select placeholder="No">
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
      </Form.Item>

      <Text >Created at:</Text> <Text>-</Text>
      <br /><br/>
      <Text >Updated at:</Text> <Text>-</Text>
      <br /><br/>
      <Text >Created by:</Text> <Text>-</Text>
      <Divider />



    
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

export default InputFileForm;
