import React from 'react'
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { setToken } from '../utils/auth'
import { loginApi } from '../services/auth';
import './login.css'

const Login = (props) => {
  const onFinish = (values) => {
    loginApi({
      username:values.username,
      password:values.password
    })
    .then(res=>{
      if(res.data.msg==='success'){
        message.success('登录成功')
        setToken(res.data.token)
        props.history.push('/admin')
      }else{
        message.info(res.data.msg)
      }
      console.log(res.data)
    })
    .catch(e=>{
      message.error('用户不存在')
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card title='登录页' className="login-form">
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>记住我</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
    </Card>
  );
};

export default Login