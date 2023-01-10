import React, { useEffect } from "react";
import styles from "./AddUser.module.scss";
import { Button, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchTypeOfUser, fetchUserList } from "redux/actions/adminAction";
import { addUser } from "services/adminService";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTypeOfUser());
  }, [dispatch]);

  const navigate = useNavigate();
  const typeOfUser = useSelector((state) => state.admin.typeOfUser);

  const getOptions = typeOfUser?.map((item) => {
    return {
      value: item.maLoaiNguoiDung,
      label: item.tenLoai,
    };
  });
  const onFinish = async (values) => {
    const params = {
      taiKhoan: values.taiKhoan,
      matKhau: values.matKhau,
      email: values.email,
      soDt: values.soDt,
      maNhom: "GP06",
      maLoaiNguoiDung: values.maLoaiNguoiDung,
      hoTen: values.hoTen,
    };
    let res = await addUser(params);
    if(res?.data?.statusCode === 200) {
      dispatch(fetchUserList(6, 1));
      navigate("/userlist")
    }
  };

  return (
    <div className={styles.addUser}>
      <h3>Thêm người dùng mới</h3>
      <div>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          name="basic"
          onFinish={onFinish}
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

          <Form.Item label="Loại người dùng" name="maLoaiNguoiDung">
            <Select
              showSearch
              style={{ width: 405 }}
              placeholder="Chọn loại người dùng"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={getOptions}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
            <Button type="primary" htmlType="submit" className={styles.button}>
              Thêm người dùng
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddUser;
