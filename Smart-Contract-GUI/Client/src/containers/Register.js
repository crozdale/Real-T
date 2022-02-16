import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styles from "./Register.module.css";
import { UserOutlined, MailOutlined, LockOutlined, BankOutlined , IdcardOutlined} from "@ant-design/icons";
import "antd/dist/antd.css";
import { Form, Input, Button, Alert } from "antd";
import { registerUser } from "../api/user";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

export default function Register(props) {
  const [errorMSG, setErrorMSG] = useState(null);

  const validateMessages = {
    required: "Field is required!",
  };

  const onFinish = ({
    firstName,
    surname,
    username,
    email,
    address,
    password,
  }) => {
    const formData = {
      firstName,
      surname,
      username,
      email,
      address,
      password,
      role: props.location.state.role,
    };
    registerUser(formData)
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        props.history.push("/real-t/");
      })
      .catch((err) => {
        setErrorMSG(err.response.data.message);
      });
  };
  if (!props?.location?.state?.role)  return <Redirect to='/home' />
  else return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <h1 className={styles.title}>Sign Up</h1>
          {errorMSG && <Alert description={errorMSG} type="error" closable className='mb-2'/>}
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
            className={styles.form}
            wrapperCol={{ span: 24 }}
          >
            <Form.Item name="firstName" rules={[{ required: true }, {
                min: 2,
                message: "First name must be at least 2 characters"
            }]}>
              <Input
                prefix={<UserOutlined />}
                placeholder="First Name"
                className={styles.input_field}
              />
            </Form.Item>
            <Form.Item name="surname" rules={[{ required: true }, {
                min: 2,
                message: "Surname must be at least 2 characters"
            }]}>
              <Input
                prefix={<UserOutlined />}
                placeholder="Surname"
                className={styles.input_field}
              />
            </Form.Item>
            <Form.Item name="username" rules={[{ required: true }, {
                min: 4,
                message: "Username must be at least 4 characters"
            }]}>
              <Input
                prefix={<IdcardOutlined />}
                placeholder="Username"
                className={styles.input_field}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                    validator(rule, value) {
                      // eslint-disable-next-line
                      if (!value || value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Invalid email address");
                    },
                  }),
              ]}
              hasFeedback
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                className={styles.input_field}
              />
            </Form.Item>
            <Form.Item
              name="address"
              hasFeedback
              rules={[
                { required: true, message: "Address is required" },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || value.match(/^0x[a-fA-F0-9]{40}$/)) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Invalid ethereum address");
                  },
                }),
              ]}
            >
              <Input
                prefix={<BankOutlined />}
                placeholder="Ethereum Address"
                className={styles.input_field}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
                {
                  min: 8,
                  message: "Password must be at least 8 characters",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                className={styles.input_field}
              />
            </Form.Item>
            <Form.Item
              name="confirm_password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "confirm password is required",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The passwords that entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
                className={styles.input_field}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.submit_btn}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          <h4 className={styles.link}>
            Have an account ? <Link to={{pathname: "/real-t/login", state:{role: props?.location?.state?.role}}}>Login</Link>{" "}
          </h4>
        </div>
      </section>
    </>
  );
}
