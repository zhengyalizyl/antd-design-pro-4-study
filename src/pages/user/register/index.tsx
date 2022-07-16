import { StateType } from '@/models/login';
import {
    Button,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
} from 'antd';
import { connect } from 'dva';
import React, { useState } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { ConnectState } from '@/models/connect';
import styles from './style.less';
import { Link } from 'umi';
import { LoginParamsType } from '@/services/login';

const { Option } = Select;
interface LoginProps {
    dispatch: Dispatch<AnyAction>;
    userLogin: StateType;
    submitting?: boolean;
}

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Reigster: React.FC<LoginProps> = props => {
    const [form] = Form.useForm();
    const [count, setCount] = useState(0)


    const handleSubmit = (values: any) => {
        const { dispatch } = props;
        console.log(values)
        delete values.agreement;
        dispatch({
            type: 'login/register',
            payload: { ...values },
        });
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    const onGetCaptcha = () => {
        let counter = 59;
        setCount(counter)
        const interval = window.setInterval(() => {
            counter -= 1;
            setCount(counter)

            if (counter === 0) {
                clearInterval(interval);
            }
        }, 1000);
    };

    return (
        <div className={styles.main}>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={handleSubmit}
                initialValues={{
                    prefix: '86',
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name=""
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="手机号码"
                    rules={[
                        {
                            required: true,
                            message: '请输入手机号！',
                          },
                          {
                            pattern: /^\d{11}$/,
                            message: '手机号格式错误！',
                          },
                    ]}
                >
                    <Input
                        addonBefore={prefixSelector}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>



                <Form.Item
                    label=" "
                    colon={false}
                    extra="We must make sure that your are a human.">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                                name="captcha"
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the captcha you got!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Button 
                             disabled={!!count}
                             onClick={onGetCaptcha}

                            >
                                 {count ? `${count} s` : '获取验证码'}
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the <a href="">agreement</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    <Link className={styles.register} to="/user/login">
                        使用已有账号登录
                    </Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default connect(({ login, loading }: ConnectState) => ({
    userLogin: login,
    submitting: loading.effects['login/register'],
}))(Reigster);