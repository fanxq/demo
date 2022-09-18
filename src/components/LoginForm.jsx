import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BaseForm.less';
import { update } from '../store/tokenSlice';

const LoginForm = (props) => {
    const dispatch = useDispatch();
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const onFinish = async (values) => {
        // console.log('Success:', values);
        setIsSubmiting(true);
        setError('');
        try {
          const { data } = await axios.post('/api?phase=1', {...values}, {headers: {'content-type': 'multipart/form-data'}});
          if (data && data.status === 0) {
            dispatch(update(data.data.token));
            navigate('/tfa', {replace: true});
          } else {
            setError(data.message);
          }
        } catch (error) {
          setError('请求出错了');
        }
        setIsSubmiting(false);
    };
    return (
        <Form
          className="base-form"
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item>
            <h3 className="title">DIGITALYCHEE</h3>
          </Form.Item>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                validator: async (rule, value) => {
                    if (!value) {
                        throw new Error('用户名不能为空');
                    } 
                    if (!/^[a-zA-Z0-9]{4,16}$/.test(value)) {
                        throw new Error('用户名格式错误，请重新输入');
                    }
                }
              },
            ]}
          >
            <Input prefix={<i className='icon-email'/>} placeholder="请输入用户名"/>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                validator: async (rule, value) => {
                    if (!value) {
                        throw new Error('密码不能为空');
                    } 
                    if (!/^[\w,.?:;'"`~!@#$%^&*\-+=_|\[\]\{\}\(\)\\\/]{8,32}$/.test(value)) {
                        throw new Error('密码格式错误，请重新输入');
                    }
                }
              },
            ]}
          >
            <Input.Password 
              visibilityToggle={false} 
              prefix={<i className='icon-lock'/>}
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item>
            <Button className="submit-btn" type="primary" htmlType="submit" disabled={isSubmiting}>
              下一步
            </Button>
          </Form.Item>
          <Form.Item className='error-wrapper'>
              {
                error ? <div className='error'>{error}</div> : null
              }
            </Form.Item>
        </Form>
    );
}

export default LoginForm;