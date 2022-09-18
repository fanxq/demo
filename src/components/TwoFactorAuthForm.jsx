import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Input } from 'antd';
import './BaseForm.less';
const TwoFactorAuthForm = (props) => {
    const token = useSelector((state) => state.token.value);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
      if(!token) {
        navigate('/login', {replace: true});
        return;
      }
    }, [token]);
    const onFinish = async (values) => {
        // console.log('Success:', values);
        setIsSubmiting(true);
        setError('');
        try {
          const { data } = await axios.post(
            '/api?phase=2', 
            { ...values }, 
            { 
              headers: { 
                'Authorization': `Bearer ${token}`, 
                'content-type': 'multipart/form-data' 
              } 
            });
            if (data && data.status === 0) {
              window.location.href = 'https://www.lizhi.io';
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
          <Form.Item className='avatar-wrapper'>
            <i className="avatar"/>
          </Form.Item>
          <Form.Item
            name="tfa"
            rules={[
              {
                required: true,
                validator: async (rule, value) => {
                    if (!value) {
                        throw new Error('两步验证码不能为空');
                    } 
                    if (!/^[\d]{6,6}$/.test(value)) {
                        throw new Error('两步验证码格式错误，请重新输入');
                    }
                }
              },
            ]}
          >
            <Input.Password 
              visibilityToggle={false} 
              prefix={<i className='icon-lock'/>}
              placeholder="请输入你的两步认证验证码"
            />
          </Form.Item>

          <Form.Item>
            <Button className="submit-btn" type="primary" htmlType="submit" disabled={isSubmiting}>
                确定
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

export default TwoFactorAuthForm;