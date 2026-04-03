import React from 'react';
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

import useLanguage from '@/locale/useLanguage';

export default function RegisterForm() {
  const translate = useLanguage();
  return (
    <div>
      <Form.Item
        label={translate('First Name')}
        name="name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={translate('Enter first name')}
          size="large"
        />
      </Form.Item>
      
      <Form.Item
        label={translate('Last Name')}
        name="surname"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={translate('Enter last name')}
          size="large"
        />
      </Form.Item>

      <Form.Item
        label={translate('email')}
        name="email"
        rules={[
          {
            required: true,
          },
          {
            type: 'email',
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder={'you@example.com'}
          type="email"
          size="large"
        />
      </Form.Item>
      <Form.Item
        label={translate('password')}
        name="password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder={'Password'}
          size="large"
        />
      </Form.Item>

      <div style={{ marginTop: '30px' }}>
        <a className="login-form-forgot" href="/login">
          {translate('Already have an account? Sign in here')}
        </a>
      </div>
    </div>
  );
}
