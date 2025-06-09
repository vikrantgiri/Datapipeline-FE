import React from 'react';
import { Form,  Button  ,Typography, Divider } from 'antd';


interface PrepMailsFormProps {
  form: any;
  onFinish: (values: any) => void;
}
const {  Title,Text } = Typography;
const PrepMailsForm: React.FC<PrepMailsFormProps> = ({ form, onFinish }) => {
  return (
    <>
    
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="max-w-3xl space-y-4"
    >
    
      <Text >Created at:</Text> <Text>-</Text>
      <br /><br/>
      <Text >Created by:</Text> <Text>-</Text>
<Divider/>

 <Title level={5}>Prep Mail Statuses</Title>
      <div className="bg-blue-500 text-white p-2 grid grid-cols-6 gap-2">
        <span>CSV FILE NAME</span>
        <span>STATUS</span>
        <span>CREATED AT</span>
        <span>CREATED BY</span>
        <span>UPDATED AT</span>
         <span>TASK LOGS</span>
      </div>

      
    </Form>
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

export default PrepMailsForm;
