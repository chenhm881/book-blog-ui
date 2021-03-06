import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
} from 'antd';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Dispatch} from "redux";
import {registerSuccess, registerFailure} from "../redux/user";
import {RouteConfigComponentProps} from "react-router-config";
import {register} from "../ajax/users";
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 4,
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
            span: 12,
            offset: 10,
        },
    },
};

interface PropsInterface extends RouteConfigComponentProps<any> {
    user: {[key: string]: any},
    message: string,
}

const mapStateToProps = (state: any) => {
    const {user, message } = state.userStore;
    return {
        user: user,
        msg: message
    }
};

const mapDispatcherToProps = (dispatch: Dispatch) => ({
    registerSuccess: (payload: any) => dispatch(registerSuccess(payload)),
    registerFailure: (payload: any) => dispatch(registerFailure(payload)),
});

export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(withRouter( (props: PropsInterface | Readonly<PropsInterface>) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        register(values, props);
    };

    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    const {user, message} = props;

    return (
        <div style={{position: "absolute", top: "20%", left: "30%", width: "50%"}}><Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
            }}
            scrollToFirstError
        >
            <Form.Item
                name="username"
                label="?????????"
                rules={[
                    {
                        required: true,
                        message: '????????????????????????!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="??????"
                rules={[
                    {
                        type: 'email',
                        message: '???????????????????????????!',
                    },
                    {
                        required: true,
                        message: '???????????????????????????!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="??????"
                rules={[
                    {
                        required: true,
                        message: '???????????????!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="????????????"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '???????????????????????????!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('???????????????????????????'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="nickname"
                label="??????"
                tooltip="????????????????????????????"
                rules={[
                    {
                        required: true,
                        message: '?????????????????????!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    ??????
                </Button>
            </Form.Item>
        </Form></div>
    );
}));
