import React, { useEffect } from "react";
import styles from "./UpdateUser.module.scss";
import { Button, Form, Input, Select } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserListSearch } from "services/adminService";

const UpdateUser = () => {
  const typeOfUser = useSelector((state) => state.admin.typeOfUser);

  const getOptions = typeOfUser.map(item => {
      return {
        value: item.maLoaiNguoiDung,
        label: item.tenLoai,
      }
  });

  const params = useParams();
  const [form] = Form.useForm();
  const setInititalValue = async () => {
      let res = await getUserListSearch(params.id);
      console.log(res);
      if (res.data && res.status === 200) {
          const user = res.data.content;
          form.setFieldsValue({
              taiKhoan: user.taiKhoan,
              matKhau: user.matKhau,
              email: user.email,
              soDt: user.soDt,
              maNhom: user.maNhom,
              maLoaiNguoiDung: user.maLoaiNguoiDung,
              hoTen: user.hoTen,
          })
      }
  };
  useEffect( () => {
      setInititalValue()
  }, []);

  const onFinish = () => {};
  return (
    <div className={styles.updateUser}>
      <h3>Cập nhật thông tin người dùng</h3>
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
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdateUser;
