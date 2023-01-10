import React from "react";
import { Button, Form, Input } from "antd";
import styles from "./Signup.module.scss";
import { signUp } from "services/authenService";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const handleSignup = async (values) => {
    try {
      let res = await signUp(values);
      if (res.data.statusCode === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.content}>
      <h2>Đăng ký</h2>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        name="basic"
        onFinish={handleSignup}
        className={styles.form}
      >
        <Form.Item
          label="Tài khoản"
          name="taiKhoan"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tài khoản!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="matKhau"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
              message: "Mật khẩu có ít nhất 6 ký tự, ít nhất 1 chữ và 1 số!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Nhập lại mật khẩu"
          name="nhapLaiMatKhau"
          dependencies={["matKhau"]}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập lại mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("matKhau") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp !"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Họ tên"
          name="hoTen"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Họ tên!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="soDt"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Số điện thoại!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Email!",
            },
            {
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Email không hợp lệ!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit" className={styles.button}>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
