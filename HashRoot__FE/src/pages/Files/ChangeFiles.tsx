import MainLayout from '../../layout/MainLayout';
import FilesForm from '../../components/Add-Form-Component/FilesForm';

const ChangeFiles = () => {
  const handleSubmit = (values: any) => {
    console.log('Form submitted:', values);

    const file = values?.file?.file;
    console.log('Uploaded file:', file);
  };

  const userOptions = ['admin', 'mikelyons', 'super','system','tylerplack'];

  return (
    <MainLayout>
      <div className="text-white">
        <h1 className="text-2xl text-black font-semibold mb-6">Change File</h1>
        <FilesForm onSubmit={handleSubmit} userOptions={userOptions} />
      </div>
    </MainLayout>
  );
};

export default ChangeFiles;
