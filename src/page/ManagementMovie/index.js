import React, { useEffect, useState } from "react";
import styles from "./ManagementMovie.module.scss";
import { Button, Input, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieListAction } from "redux/actions/adminAction";
import { BsPencilSquare } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineSchedule } from "react-icons/ai";
import { Link } from "react-router-dom";
import { deleteMovie } from "services/adminService";

const { Search } = Input;

const onSearch = (value) => console.log(value);

const columns = [
  {
    title: <div className={styles.titleId}>Mã phim</div>,
    dataIndex: "movieId",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: <div className={styles.titleImg}>Hình ảnh</div>,
    dataIndex: "image",
  },
  {
    title: <div className={styles.titleName}>Tên phim</div>,
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: <div className={styles.titleDesc}>Mô tả</div>,
    dataIndex: "desc",
  },
  {
    title: <div className={styles.titleOption}>Tuỳ chọn</div>,
    dataIndex: "action",
  },
];

const ManagementMovie = () => {
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.admin.movieList);
  const [current, setCurrent] = useState(1);
  const pageSize = 4;
  const onChange = (pagination, sorter) => {
    dispatch(fetchMovieListAction(pagination.pageSize, pagination.current));
    setCurrent(pagination.current);
  };

  useEffect(() => {
    dispatch(fetchMovieListAction(pageSize, current));
  }, [dispatch]);

  const handleDelete = async (maPhim) => {
    let res = await deleteMovie(maPhim);
    if (res.data.statusCode === 200) {
      dispatch(fetchMovieListAction(pageSize, current));
    }
  };

  // const handleUpdate = (maPhim) => {
  //   let movieUpdate = movieList.items.find(item => item.maPhim === maPhim);
  //   // đổ thông tin lên formData
  //   const formData = new FormData();

  //   };

  const data = movieList?.items?.map((item, index) => {
    return {
      key: index,
      movieId: <div>{item.maPhim}</div>,
      image: <img alt="" src={item.hinhAnh} />,
      name: <div className={styles.name}>{item.tenPhim}</div>,
      desc: (
        <div className={styles.desc}>{item.moTa.substr(0, 50) + "..."}</div>
      ),
      action: (
        <div className={styles.option}>
          <div className={styles.update}>
            <Link to={`/updatemovie/${item.maPhim}`}>
              <BsPencilSquare />
            </Link>
          </div>
          <div
            onClick={() => handleDelete(item.maPhim)}
            className={styles.delete}
          >
            <RiDeleteBin6Line />
          </div>
          <div className={styles.showtime}>
            <Link to={`/showtime/${item.maPhim}`}>
              <AiOutlineSchedule />
            </Link>
          </div>
        </div>
      ),
    };
  });

  return (
    <div className={styles.content}>
      <h4>Quản lý phim</h4>
      <div className={styles.btn}>
        <Link to="/addmovie">
          <Button type="primary">Thêm phim</Button>
        </Link>
      </div>
      <div className={styles.search}>
        <Search
          placeholder="Input search text"
          onSearch={onSearch}
          enterButton
        />
      </div>
      <div className={styles.table}>
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          pagination={{ pageSize: pageSize, total: movieList.totalCount }}
        />
      </div>
    </div>
  );
};

export default ManagementMovie;
