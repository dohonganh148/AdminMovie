import React, { useEffect, useState } from "react";
import styles from "./Update.module.scss";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Switch,
} from "antd";
import { getMovieDetail, updateMovie } from "services/adminService";
import { useNavigate, useParams } from "react-router-dom";
import Moment from "moment";
import { useDispatch } from "react-redux";
import { fetchMovieListAction } from "redux/actions/adminAction";

const UpdateMovie = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [uploadImg, setUploadImg] = useState("");
  const [selectedImg, setSelectedImg] = useState();
  const dateFormat = "DD/MM/YYYY";
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const params = useParams();
  const [form] = Form.useForm();
  const setInititalValue = async () => {
    let res = await getMovieDetail(params.id);
    if (res.data && res.status === 200) {
      const movie = res.data.content;
      form.setFieldsValue({
        maPhim: movie.maPhim,
        maNhom: movie.maNhom,
        tenPhim: movie.tenPhim,
        trailer: movie.trailer,
        moTa: movie.moTa,
        ngayKhoiChieu: Moment(movie.ngayKhoiChieu),
        danhGia: movie.danhGia,
        dangChieu: movie.dangChieu,
        sapChieu: movie.sapChieu,
        hot: movie.hot,
      });
      setUploadImg(movie.hinhAnh);
    }
  };
  useEffect(() => {
    setInititalValue();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("maPhim", values.maPhim);
    formData.append("tenPhim", values.tenPhim);
    formData.append("trailer", values.trailer);
    formData.append("moTa", values.moTa);
    formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
    formData.append("dangChieu", values.dangChieu);
    formData.append("sapChieu", values.sapChieu);
    formData.append("hot", values.hot);
    formData.append("danhGia", values.danhGia);
    if (selectedImg)
      formData.append("File", selectedImg, selectedImg?.type?.split("/")[1]);
    formData.append("maNhom", values.maNhom);

    let res = await updateMovie(formData);
    console.log(res);
    if (res?.data?.statusCode === 200) {
      dispatch(fetchMovieListAction(4, 1));
      navigate("/");
    } else {
      alert(res?.data?.content);
    }
  };
  const handleSelectFile = (e) => {
    // console.log(e.target.files[0]);
    let url = URL.createObjectURL(e.target.files[0]);
    setUploadImg(url);
    setSelectedImg(e.target.files[0]);
  };
  return (
    <div className={styles.updateMovie}>
      <h3>C???p nh???t th??ng tin phim</h3>
      <div>
        <Form
          form={form}
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
          <Form.Item name="maPhim" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="maNhom" hidden>
            <Input />
          </Form.Item>
          <Form.Item label="T??n phim" name="tenPhim">
            <Input />
          </Form.Item>
          <Form.Item label="Trailer" name="trailer">
            <Input />
          </Form.Item>
          <Form.Item label="M?? t???" name="moTa">
            <Input />
          </Form.Item>
          <Form.Item label="Ng??y kh???i chi???u" name="ngayKhoiChieu">
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            label="??ang chi???u"
            valuePropName="checked"
            name="dangChieu"
          >
            <Switch />
          </Form.Item>
          <Form.Item label="S???p chi???u" valuePropName="checked" name="sapChieu">
            <Switch />
          </Form.Item>
          <Form.Item label="Hot" valuePropName="checked" name="hot">
            <Switch />
          </Form.Item>
          <Form.Item label="????nh gi??:" name="danhGia">
            <InputNumber />
          </Form.Item>

          <Form.Item label="H??nh ???nh" valuePropName="fileList">
            <Input type={"file"} onChange={handleSelectFile} />
            <img src={uploadImg} alt="" className={styles.imgUpdate} />
          </Form.Item>
          <Form.Item label="T??c v???">
            <Button type="primary" htmlType="submit">
              C???p nh???t
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdateMovie;
