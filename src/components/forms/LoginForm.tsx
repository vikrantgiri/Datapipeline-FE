import { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { postLogin } from '../../api/login-api'
import { useAuth } from '../../hooks/useAuth'
import type { LoginCredentials } from '../../types'

const LoginForm: React.FC = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (values: LoginCredentials) => {
    setError('')
    setLoading(true)

    try {
      const res = await postLogin(values)

      if (res?.data?.access_token) {
        // Use the auth context login function
        login(res.data.access_token, res.data.user)
      } else {
        setError(res.message ?? 'Invalid credentials.')
      }
    } catch (err) {
      console.error(err)
      setError('An error occurred while logging in.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form
      name='login-form'
      onFinish={handleSubmit}
      layout='vertical'
      className=' p-20 rounded-lg w-full max-w-md m-6'
    >
      <h2 className='text-2xl font-semibold mb-6'>Login to your account</h2>

      {error && <p className='text-red-600 text-sm mb-4'>{error}</p>}

      <Form.Item
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please enter your username!' }]}
      >
        <Input
          id='username'
          aria-label='username'
          placeholder='Enter your username'
        />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please enter your password!' }]}
      >
        <Input.Password
          id='password'
          aria-label='password'
          placeholder='Enter your password'
        />
      </Form.Item>

      <Button
        type='primary'
        htmlType='submit'
        block
        loading={loading}
        className='bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded-md transition'
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </Form>
  )
}

export default LoginForm
