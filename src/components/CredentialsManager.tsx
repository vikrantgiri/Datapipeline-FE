// import React, { useState } from "react";
// import { Form } from "antd";
// import CredentialsForm from "./Add-Form-Component/CredentialsForm";
// import CredentialsTable from "../components/Add-Form-Component";

// const CredentialsManager: React.FC = () => {
//   const [form] = Form.useForm();
//   const [credentials, setCredentials] = useState<any[]>([]);

//   const handleSave = (values: any) => {
//     const newCredential = { key: Date.now(), ...values };
//     setCredentials([newCredential, ...credentials]);
//     form.resetFields();
//   };

//   const handleSaveAndAddAnother = (values: any) => {
//     handleSave(values);
//     form.resetFields();
//   };

//   const handleSaveAndContinueEditing = (values: any) => {
//     const newCredential = { key: Date.now(), ...values };
//     setCredentials([newCredential, ...credentials]);
    
//   };

//   const handleDelete = (key: number) => {
//     setCredentials((prev) => prev.filter((item) => item.key !== key));
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Add Credential</h1>

//       <CredentialsForm
//         form={form}
//         onFinish={handleSave}
//         onSaveAndAddAnother={handleSaveAndAddAnother}
//         onSaveAndContinueEditing={handleSaveAndContinueEditing}
//       />

//       <div className="mt-8">
//         <CredentialsTable data={credentials} onDelete={handleDelete} />
//       </div>
//     </div>
//   );
// };

// export default CredentialsManager;
