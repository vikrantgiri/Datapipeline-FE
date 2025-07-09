import { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { useAuth } from '../hooks/useAuth'
import { postLogin } from '../api/login-api'

const AuthForm = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (values: {
    username: string
    password: string
  }) => {
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
      className='space-y-6'
    >
      {error && (
        <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
          <div className='flex items-center'>
            <svg
              className='w-5 h-5 text-red-400 mr-2'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                clipRule='evenodd'
              />
            </svg>
            <p className='text-red-600 text-sm font-medium'>{error}</p>
          </div>
        </div>
      )}

      <Form.Item
        label={<span className='text-gray-700 font-medium'>Username</span>}
        name='username'
        rules={[{ required: true, message: 'Please enter your username!' }]}
        className='mb-4'
      >
        <Input
          id='username'
          aria-label='username'
          placeholder='Enter your username'
          size='large'
          className='h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200'
          prefix={
            <svg
              className='w-5 h-5 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              />
            </svg>
          }
        />
      </Form.Item>

      <Form.Item
        label={<span className='text-gray-700 font-medium'>Password</span>}
        name='password'
        rules={[{ required: true, message: 'Please enter your password!' }]}
        className='mb-6'
      >
        <Input.Password
          id='password'
          aria-label='password'
          placeholder='Enter your password'
          size='large'
          className='h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200'
          prefix={
            <svg
              className='w-5 h-5 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
              />
            </svg>
          }
        />
      </Form.Item>

      <Button
        type='primary'
        htmlType='submit'
        block
        size='large'
        className='h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]'
      >
        {loading ? (
          <span className='flex items-center justify-center'>
            <svg
              className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
            Signing in...
          </span>
        ) : (
          'Sign In'
        )}
      </Button>

      <div className='text-center mt-6'>
        <p className='text-xs text-gray-500'>
          By signing in, you agree to our{' '}
          <a href='#' className='text-blue-600 hover:text-blue-700 font-medium'>
            Terms of Service
          </a>{' '}
          and{' '}
          <a href='#' className='text-blue-600 hover:text-blue-700 font-medium'>
            Privacy Policy
          </a>
        </p>
      </div>
    </Form>
  )
}

export default AuthForm
