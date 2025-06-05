import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InputFileForm from "../../components/Add-Form-Component/InputFileDForm";
import MainLayout from "../../layout/MainLayout";
import { mockInputFileData } from "./data"; 

const ChangeInputFileDefinition: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<any>(null);

  useEffect(() => {
  
    const record = mockInputFileData.find((item) => item.id === id);
    if (record) {
      setInitialValues(record);
    }
  }, [id]);

  const handleSubmit = (values: any) => {
    console.log("Form submitted:", values);
    
  };

  return (
    <MainLayout>
      <div className="text-black p-6">
        <h1 className="text-2xl font-semibold mb-6">Edit Input File Definition</h1>
        {initialValues && <InputFileForm onSubmit={handleSubmit} initialValues={initialValues} />}
      </div>
    </MainLayout>
  );
};

export default ChangeInputFileDefinition;
