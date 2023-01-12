import React, { useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import styles from "./Layout.module.scss";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "redux/actions/authenAction";
import ManagementMovie from "page/ManagementMovie";
import AddMovie from "page/AddMovie";
import UpdateMovie from "page/UpdateMovie";
import Showtime from "page/Showtime";
import ManagementUser from "page/ManagementUser";
import AddUser from "page/AddUser";
import UpdateUser from "page/UpdateUser";
import Login from "page/Login";
import Signup from "page/Signup";

const { Header, Content, Sider } = Layout;

const LayoutAdmin = ({ children }) => {
  const auth = useSelector((state) => state?.authen?.profile);
  const menu = [
    {
      label: "Movies",
      link: "/movies",
      key: "00",
      subMenu: [
        { label: "Movies List", link: "/", key: "01" },
        {
          label: "Add new",
          link: "/addmovie",
          key: "02",
          hidden: auth?.maLoaiNguoiDung !== "QuanTri",
        },
      ].filter((item) => !item.hidden),
    },
    {
      label: "Users",
      link: "/users",
      key: "10",
      subMenu: [
        { label: "Users List", link: "/userlist", key: "11" },
        {
          label: "Add new",
          link: "/adduser",
          key: "12",
          hidden: auth?.maLoaiNguoiDung !== "QuanTri",
        },
      ].filter((item) => !item.hidden),
    },
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [current, setCurrent] = useState("00");
  const profile = useSelector((state) => state.authen.profile);
  const dispatch = useDispatch();
  // logout
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  const items2 = menu.map((item) => {
    return {
      key: item.key,
      label: <div>{item.label}</div>,
      children:
        item.subMenu &&
        item?.subMenu.map((item) => {
          return {
            key: item.key,
            label: (
              <NavLink to={item.link} key={item.key}>
                <div>{item.label}</div>
              </NavLink>
            ),
          };
        }),
    };
  });
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Layout>
      <Header className="header">
        <div className={styles.navbar}>
          <Link to="/" className={styles.logo}>
            Admin Cinemas
          </Link>
          {profile ? (
            <div className={styles.profile}>
              <span className={styles.user}>Hello, {profile?.hoTen}</span>
              <div className={styles.dropdownMenu}>
                <button className={styles.menuItem} onClick={handleLogout}>
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.content}>
              <NavLink
                to="/login"
                className={({ isActive }) => {
                  if (isActive)
                    return `${styles.authenActive} ${styles.authen}`;
                  return styles.authen;
                }}
              >
                Đăng nhập
              </NavLink>
              <span> | </span>
              <NavLink
                to="/signup"
                className={({ isActive }) => {
                  if (isActive)
                    return `${styles.authenActive} ${styles.authen}`;
                  return styles.authen;
                }}
              >
                Đăng ký
              </NavLink>
            </div>
          )}
        </div>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
          className="sider"
        >
          <Menu
            onClick={(e) => handleClick(e)}
            defaultSelectedKeys={["00"]}
            mode="inline"
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items2}
            selectedKeys={[current]}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          ></Breadcrumb>
          <Content
            style={{
              padding: 24,
              marginTop: 64,
              height: "calc(100vh - 118px)",
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route exact path="/" element={<ManagementMovie />} />
              <Route path="addmovie" element={<AddMovie />} />
              <Route path="updatemovie/:id" element={<UpdateMovie />} />
              <Route path="showtime/:id" element={<Showtime />} />
              <Route path="userlist" element={<ManagementUser />} />
              <Route path="adduser" element={<AddUser />} />
              <Route path="updateuser/:id" element={<UpdateUser />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
