import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const onFinish = async (values: { email: string; password: string }) => {
        try {
            const response = await fetch(
                'https://e-backend-8z4t.onrender.com/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                }
            );

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            console.log('Login successful:', data);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='text-center text-4xl my-5'>Login page</h1>
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
                    <Input size='large' />
                </Form.Item>
                <h1 className='text-1xl mb-2'>Password</h1>
                <Form.Item
                    name='password'
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password size='large' />
                </Form.Item>

                <Button size={'large'} type='primary' htmlType='submit'>
                    Submit
                </Button>
                <Link to={'/'}>
                    <Button type='link'>Go to home</Button>
                </Link>
                {error && <p>{error}</p>}
            </Form>
        </div>
    );
};

export default Login;
