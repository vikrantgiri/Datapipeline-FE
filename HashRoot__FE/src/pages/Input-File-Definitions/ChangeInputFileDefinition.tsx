import React from 'react';
import MainLayout from '../../layout/MainLayout';
import InputFileForm from '../../components/Add-Form-Component/InputFileDForm'; 

const ChangeInputFileDefinition: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log('Form submitted:', values);
    
  };

  return (
    <MainLayout>
      <div className="text-black">
        <h1 className="text-2xl font-semibold mb-6">Change Input File Definition</h1>
        <InputFileForm onSubmit={handleSubmit} />
      </div>
    </MainLayout>
  );
};

export default ChangeInputFileDefinition;
