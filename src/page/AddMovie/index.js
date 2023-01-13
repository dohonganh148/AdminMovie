import React, { useState } from "react";
import styles from "./AddMovie.module.scss";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Switch,
} from "antd";
import { v4 as uuid } from "uuid";
import { addNewMovie } from "services/adminService";
import Moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMovieListAction } from "redux/actions/adminAction";
const AddMovie = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [selectedImg, setSelectedImg] = useState();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const maPhim = uuid();
    const formData = new FormData();
    formData.append("maPhim", maPhim);
    formData.append("tenPhim", values.tenPhim);
    formData.append("trailer", values.trailer);
    formData.append("moTa", values.moTa);
    formData.append(
      "ngayKhoiChieu",
      Moment(values.ngayKhoiChieu).format("DD/MM/yyyy")
    );
    formData.append("dangChieu", values.dangChieu);
    formData.append("sapChieu", values.sapChieu);
    formData.append("hot", values.hot);
    formData.append("danhGia", values.danhGia);
    formData.append("File", selectedImg, "jpeg");
    formData.append("maNhom", "GP06");
    let res = await addNewMovie(formData);

    if (res.data.statusCode === 200) {
      dispatch(fetchMovieListAction(4, 1));
      navigate("/");
    }
  };
  const handleSelectFile = (e) => {
    setSelectedImg(e.target.files[0]);
  };

  return (
    <div className={styles.addMovie}>
      <h3>Thêm phim mới</h3>
      <div>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          onFinish={onFinish}
        >
          <Form.Item label="Form Size" name="size">
            <Radio.Group>
              <Radio.Button value="small">Small</Radio.Button>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="large">Large</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Tên phim" name="tenPhim">
            <Input />
          </Form.Item>
          <Form.Item label="Trailer" name="trailer">
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả" name="moTa">
            <Input />
          </Form.Item>
          <Form.Item label="Ngày khởi chiếu" name="ngayKhoiChieu">
            <DatePicker format="dd/MM/YYYY" />
          </Form.Item>
          <Form.Item
            label="Đang chiếu"
            valuePropName="checked"
            name="dangChieu"
          >
            <Switch />
          </Form.Item>
          <Form.Item label="Sắp chiếu" valuePropName="checked" name="sapChieu">
            <Switch />
          </Form.Item>
          <Form.Item label="Hot" valuePropName="checked" name="hot">
            <Switch />
          </Form.Item>
          <Form.Item label="Đánh giá:" name="danhGia">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Hình ảnh" valuePropName="fileList">
            <Input type={"file"} onChange={handleSelectFile} />
          </Form.Item>

          <Form.Item label="Tác vụ">
            <Button type="primary" ghost htmlType="submit">
              Thêm phim
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddMovie;
