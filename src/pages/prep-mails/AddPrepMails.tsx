import { Form } from 'antd'
import PrepMailsForm from '../../components/Add-Form-Component/PrepMailsForm'

const AddPrepMails = () => {
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    console.log('Submitted PrepMail values:', values)
  }

  return (
    <div className='text-white'>
      <h1 className='text-2xl text-black font-semibold mb-6'>Add Prep Mails</h1>
      <div className='pr-4' />
      <PrepMailsForm form={form} onFinish={handleSubmit} />
    </div>
  )
}

export default AddPrepMails
