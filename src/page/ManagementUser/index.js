import React, { useEffect, useState } from "react";
import styles from "./ManagementUser.module.scss";
import { Button, Input, Table } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsPencilSquare } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { fetchUserList, fetchUserListSearch } from "redux/actions/adminAction";
import { deleteUser } from "services/adminService";


const ManagementUser = () => {
  const { Search } = Input;
  const auth = useSelector(state => state.authen.profile);

const columns = [
  {
    title: <div className={styles.titleId}>STT</div>,
    dataIndex: "userId",
    width: "5%",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: <div className={styles.titleAccount}>Tài khoản</div>,
    dataIndex: "account",
    width: "15%",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: <div className={styles.titlePassword}>Mật khẩu</div>,
    dataIndex: "password",
    width: "15%",
  },
  {
    title: <div className={styles.titleName}>Họ tên</div>,
    dataIndex: "name",
    width: "15%",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: <div className={styles.titleEmail}>Email</div>,
    dataIndex: "email",
    width: "20%",
  },
  {
    title: <div className={styles.titleTel}>Số điện thoại</div>,
    dataIndex: "telNum",
    width: "15%",
  },
  {
    title: <div className={styles.titleOption}>Tuỳ chọn</div>,
    dataIndex: "action",
    width: "10%",
    hidden: auth?.maLoaiNguoiDung !== "QuanTri",
  },
].filter((item) => !item.hidden);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const pageSize = 6;
  const userList = useSelector((state) => state.admin.userList);

  useEffect(() => {
    dispatch(fetchUserList(6, 1));
  }, [dispatch]);

  const onChange = (pagination, sorter) => {
    dispatch(fetchUserList(pagination.pageSize, pagination.current));
    setCurrent(pagination.current);
  };

  const handleDelete = async (taiKhoan) => {
    let res = await deleteUser(taiKhoan);
    if (res.data.statusCode === 200) {
      dispatch(fetchUserList(pageSize, current));
    }
  };

  const onSearch = (value) => {
    if (!value) {
      dispatch(fetchUserList(6, 1));
    } else {
      dispatch(fetchUserListSearch(value));
    }
  };
  const data = userList?.items?.map((item, index) => {
    return {
      key: index,
      userId: <div>{index + 1}</div>,
      account: <div>{item.taiKhoan}</div>,
      password: <div>{item.matKhau}</div>,
      name: <div className={styles.name}>{item.hoTen}</div>,
      email: <div>{item.email}</div>,
      telNum: <div>{item.soDt || item.soDT}</div>,
      action: (
        <div className={styles.option}>
          <div className={styles.update}>
            <Link to={`/updateuser/${item.taiKhoan}`}>
              <BsPencilSquare />
            </Link>
          </div>
          <div
            onClick={() => handleDelete(item.taiKhoan)}
            className={styles.delete}
          >
            <RiDeleteBin6Line />
          </div>
        </div>
      ),
    };
  });

  return (
    <div className={styles.content}>
      <h4>Quản lý người dùng </h4>
      { auth?.maLoaiNguoiDung === "QuanTri" ? (<div className={styles.btn}>
        <Link to="/adduser">
          <Button type="primary">Thêm người dùng</Button>
        </Link>
      </div>) : ""}
      <div className={styles.search}>
        <Search
          placeholder="Nhập vào tài khoản hoặc họ tên người dùng"
          onSearch={onSearch}
          enterButton
        />
      </div>
      <div className={styles.table}>
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          pagination={{ pageSize: 6, total: userList.totalCount }}
        />
      </div>
    </div>
  );
};

export default ManagementUser;
