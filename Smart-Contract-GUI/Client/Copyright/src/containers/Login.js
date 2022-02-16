import React, { useState } from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import styles from "./Register.module.css";
import "antd/dist/antd.css";
import { Form, Input, Button, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { loginUser } from "../api/user";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

export default function Login(props) {
  const [errorMSG, setErrorMSG] = useState(null);

  const validateMessages = {
    required: "Field is required!",
  };

  const onFinish = ({ username, password }) => {
    const role = props.location.state.role;
    const formData = {
      username,
      password,
      role,
    };
    loginUser(formData)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('role', role);
          localStorage.setItem('id', res.data);
          props.history.push("/copyright/writings");
        }
      })
      .catch((e) => {
        // if no user was found in DB or invalid email/password combination
        if (e?.response?.status === 401) setErrorMSG("Invalid credentials");
        // server side problem
        else setErrorMSG("Something wrong happened");
      });
  };
  if (!props?.location?.state?.role)  return <Redirect to='/home' />
  else return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <h1 className={styles.title}>Sign In</h1>
          {errorMSG && <Alert description={errorMSG} type="error" closable className='mb-2'/>}
          <Form
            {...layout}
            name="login_form"
            onFinish={onFinish}
            validateMessages={validateMessages}
            className={styles.form}
            wrapperCol={{ span: 24 }}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true },
                { min: 4, message: "Username must be at least 4 characters" },
                { max: 30, message: "Username can't exceed 30 characters" },
              ]}
              hasFeedback
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Username"
                className={styles.input_field}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true },
                { min: 8, message: "Password must be at least 8 characters" },
                { max: 30, message: "Password can't exceed 30 characters" },
              ]}
              hasFeedback
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                className={styles.input_field}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.submit_btn}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <h4 className={styles.link}>
            Don't have account? <NavLink to={{pathname: "/copyright/register", state:{role: props.location.state.role}}}>Register</NavLink>{" "}
          </h4>
        </div>
      </section>
    </>
  );
}
