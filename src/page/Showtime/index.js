import React, { useEffect, useState } from "react";
import styles from "./Showtime.module.scss";
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  TimePicker,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCinemaGroup,
  fetchCinemaList,
  fetchMovieDetail,
} from "redux/actions/adminAction";
import { showtimeMovie } from "services/adminService";
import { useNavigate, useParams } from "react-router-dom";
import Moment from "moment";
const Showtime = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCinemaList());
  }, [dispatch]);
  const [currentCinemaGroup, setCurrentCinemaGroup] = useState();
  const [selectedCinema, setSelectedCinema] = useState();

  const cinemaList = useSelector((state) => state.admin.cinemaList);
  const cinemaGroup = useSelector((state) => state.admin.cinemaGroup);
  const movieDetail = useSelector((state) => state.admin.movieDetail);
  const params = useParams();
  useEffect(() => {
    dispatch(fetchMovieDetail(params.id));
  }, [dispatch, params.id]);

  const searchBox = [
    {
      label: "Hệ thống rạp:",
      placeholder: "Chọn hệ thống rạp",
    },
    {
      label: "Cụm rạp:",
      placeholder: "Chọn cụm rạp",
    },
    {
      label: "Danh sách rạp:",
      placeholder: "Chọn rạp",
    },
  ];
  const getOptions = (type) => {
    switch (type) {
      case "Hệ thống rạp:":
        return cinemaList?.map((item) => {
          return {
            value: item.maHeThongRap,
            label: item.tenHeThongRap,
          };
        });
      case "Cụm rạp:":
        return cinemaGroup?.map((item) => {
          return {
            value: item.maCumRap,
            label: item.tenCumRap,
          };
        });
      case "Danh sách rạp:":
        return currentCinemaGroup?.danhSachRap?.map((item) => {
          return {
            value: item.maRap,
            label: item.tenRap,
          };
        });
      default:
        return cinemaList?.map((item) => {
          return {
            value: item.maHeThongRap,
            label: item.tenHeThongRap,
          };
        });
    }
  };
  const handleChange = (id, label) => {
    switch (label) {
      case "Hệ thống rạp:":
        dispatch(fetchCinemaGroup(id));
        break;
      case "Cụm rạp:":
        setCurrentCinemaGroup(cinemaGroup.find((item) => item.maCumRap === id));
        break;
      case "Danh sách rạp:":
        setSelectedCinema(id);
        break;
      default:
        dispatch(fetchCinemaGroup(id));
    }
  };

  const navigate = useNavigate();
  const onFinish = async (values) => {
    const params = {
      maPhim: movieDetail.maPhim,
      ngayChieuGioChieu: Moment(values.ngayChieu).format("DD/MM/yyyy hh:mm:ss"),
      maRap: currentCinemaGroup.maCumRap,
      giaVe: values.price,
    };
    let res = await showtimeMovie(params);
    if(res.statusCode === 200) {
      navigate("/")
    }
  };
  return (
      <div className={styles.showtime}>
        <h3>Tạo lịch chiếu - {movieDetail?.tenPhim}</h3>
        <div className={styles.content}>
          <div>
            <img alt="" src={movieDetail?.hinhAnh} />
          </div>
          <div>
            <Form
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onFinish}
            >
              {searchBox.map((item, index) => {
                return (
                  <Form.Item key={index} label={item.label} name={item.name}>
                    <Select
                      showSearch
                      style={{ width: 400 }}
                      placeholder={item.placeholder}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={getOptions(item.label)}
                      onChange={(id) => handleChange(id, item.label)}
                    />
                  </Form.Item>
                );
              })}
              <Form.Item label="Ngày chiếu:" name={"ngayChieu"}>
                <DatePicker />
              </Form.Item>
              <Form.Item label="Giờ chiếu" name={"gioChieu"}>
                <TimePicker />
              </Form.Item>
              <Form.Item label="Giá vé:" name={"price"}>
                <InputNumber />
              </Form.Item>

              <Form.Item label="Chức năng:">
                <Button type="primary" ghost htmlType="submit">
                  Tạo lịch chiếu
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
  );
};

export default Showtime;
