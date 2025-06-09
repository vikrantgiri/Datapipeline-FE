
import { Form } from "antd";
import MainLayout from "../../layout/MainLayout";
import PrepMailsForm from "../../components/Add-Form-Component/PrepMailsForm";

const ChangePrepMails = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("Submitted PrepMail values:", values);
   
  };

  return (
    <MainLayout>
      <div className="text-white">
        <h1 className="text-2xl text-black font-semibold mb-6">Change Prep Mails</h1>
        <div className="pr-4" />
        <PrepMailsForm form={form} onFinish={handleSubmit} />
      </div>
    </MainLayout>
  );
};

export default ChangePrepMails;
