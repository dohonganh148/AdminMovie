import React from "react";
import styles from "./Login.module.scss";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { loginAction } from "redux/actions/authenAction";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    try {
      await dispatch(loginAction(values));
      navigate("/");
    } catch (err) {
      throw err;
    }
  };
  return (
    <div className={styles.content}>
      <h2>Đăng nhập</h2>
      <Form name="basic" onFinish={handleLogin} className={styles.form}>
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
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 0,
          }}
        >
          <Button type="primary" htmlType="submit" className={styles.button}>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
