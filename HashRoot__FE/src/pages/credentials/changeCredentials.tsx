import React, { useState } from 'react';
import { Table } from 'antd';
import MainLayout from '../../layout/MainLayout';
import CredentialsForm from '../../components/Add-Form-Component/CredentialsForm'; 
import { Form } from 'antd';

const ChangeCredentials: React.FC = () => {
  const [form] = Form.useForm();
  const [credentials, setCredentials] = useState<any[]>([]);

  const handleFinish = (values: any) => {
    const newCredential = {
      key: credentials.length + 1,
      ...values,
    };
    setCredentials([newCredential, ...credentials]);
    form.resetFields();
  };

  const columns = [
    { title: 'Third Party', dataIndex: 'third_party', key: 'third_party' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Host', dataIndex: 'host', key: 'host' },
    { title: 'Database', dataIndex: 'database', key: 'database' },
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Port', dataIndex: 'port', key: 'port' },
    { title: 'Created By', dataIndex: 'created_by', key: 'created_by' },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Updated At', dataIndex: 'UpdatedAt', key: 'UpdatedAt' },
  ];

  return (
    <MainLayout>
      <div className=" text-white ">
        <h1 className="text-2xl text-black font-semibold mb-6">Change Credential</h1>

        <div className="pr-4">
          <CredentialsForm form={form} onFinish={handleFinish} />
        </div>
      

        {credentials.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl mb-4">Saved Credentials</h2>
            <Table
              dataSource={credentials}
              columns={columns}
              pagination={{ pageSize: 5 }}
              scroll={{ x: true }}
              className="bg-white rounded"
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ChangeCredentials;
