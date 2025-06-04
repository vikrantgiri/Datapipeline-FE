
import React from 'react';
import MainLayout from '../../layout/MainLayout';
import FileDownloadForm from  '../../components/Add-Form-Component/FileDDForm';

const AddFileDD: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log('Form submitted:', values);
  };

  return (
    <MainLayout>
       <div className=" text-white ">
        <h1 className="text-2xl text-black font-semibold mb-6">Add File Download Definition</h1>

        <div className="pr-4"></div>
      <FileDownloadForm onSubmit={handleSubmit} />
      </div>
    </MainLayout>
  );
};

export default AddFileDD;
