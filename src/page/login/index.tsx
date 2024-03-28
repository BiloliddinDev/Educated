import { toast } from '@/components/ui/use-toast'
import { baseurl } from '@/utils/axios'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Input, Select } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'

const Login = () => {
	const navigate = useNavigate()
	const [login, setLogin] = useState(false)

	const onFinish = async (values: { email: string; password: string }) => {
		if (login) {
			// register
			baseurl.post(`/register`, values).then(res => {
				toast({
					title: `${res?.data?.message} ✅✅✅`,
				})
				setLogin(true)
			})
		} else {
			//login
			baseurl.post(`/login`, values).then(res => {
				console.log(res, 1111)
				localStorage.setItem('token', `${res?.data?.token}`)
				localStorage.setItem('role', `${res?.data?.role}`)
				toast({
					title: 'You are Welcome ✅✅✅',
				})
				navigate(`/${res?.data?.role}`)
			})
		}
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	return login ? (
		<div className='flex flex-col justify-center items-center'>
			<h1 className='text-center text-4xl my-5'>Sign in</h1>
			<Form
				name='basic'
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
				className='flex flex-col justify-center w-[500px]'
			>
				<h1 className='text-1xl mb-2'>Name</h1>
				<Form.Item
					name='name'
					rules={[{ required: true, message: 'Please input your name!' }]}
				>
					<Input
						size='large'
						prefix={<UserOutlined className='site-form-item-icon' />}
					/>
				</Form.Item>
				<h1 className='text-1xl mb-2'>Email</h1>
				<Form.Item
					name='email'
					rules={[{ required: true, message: 'Please input your email!' }]}
				>
					<Input
						size='large'
						prefix={<UserOutlined className='site-form-item-icon' />}
					/>
				</Form.Item>
				<h1 className='text-1xl mb-2'>Password</h1>
				<Form.Item
					name='password'
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password
						size='large'
						prefix={<LockOutlined className='site-form-item-icon' />}
					/>
				</Form.Item>

				<h1 className='text-1xl mb-2'>Select your role</h1>
				<Form.Item
					name='role'
					rules={[{ required: true, message: 'Please select your role!' }]}
				>
					<Select size='large'>
						<Select.Option value='student'>Student</Select.Option>
						<Select.Option value='teacher'>Teacher</Select.Option>
					</Select>
				</Form.Item>

				<Button size={'lg'} type='submit'>
					Submit
				</Button>
				<Button onClick={() => setLogin(false)} variant='link'>
					Already have an account?
				</Button>
			</Form>
		</div>
	) : (
		<div className='flex flex-col justify-center items-center'>
			<h1 className='text-center text-4xl my-5'>Login</h1>
			<Form
				name='basic'
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
				className='flex flex-col justify-center w-[500px]'
			>
				<h1 className='text-1xl mb-2'>Email</h1>
				<Form.Item
					name='email'
					rules={[{ required: true, message: 'Please input your email!' }]}
				>
					<Input
						size='large'
						prefix={<UserOutlined className='site-form-item-icon' />}
					/>
				</Form.Item>
				<h1 className='text-1xl mb-2'>Password</h1>
				<Form.Item
					name='password'
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password
						size='large'
						prefix={<LockOutlined className='site-form-item-icon' />}
					/>
				</Form.Item>

				<Button size={'lg'} type='submit'>
					Submit
				</Button>

				<Button onClick={() => setLogin(true)} variant='link'>
					Don't have an account? Register now.
				</Button>
			</Form>
		</div>
	)
}

export default Login
