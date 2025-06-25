import FilesForm from '../../components/Add-Form-Component/FilesForm';
import { Form, message} from "antd";

const ChangeFiles = () => {
  const [form] = Form.useForm();
  const handleSubmit = (values: any) => {
    console.log('Form submitted:', values);

    const file = values?.file?.file;
    console.log('Uploaded file:', file);
  };

  const userOptions = ['admin', 'mikelyons', 'super','system','tylerplack'];

  return (
      <div className="text-white">
        <h1 className="text-2xl text-black font-semibold mb-6">Change File</h1>
        <FilesForm form={form} onSubmit={handleSubmit} userOptions={userOptions} />
      </div>
  );
};

export default ChangeFiles;
