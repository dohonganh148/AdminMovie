import requester from "./api";
import apiPath from "./apiPath";

// get API lay danh sach phim
export const getMovieList = async (pageSize, current) => {
  try {
    const res = await requester({
      method: "GET",
      url: apiPath.MOVIE_LIST,
      params: {
        maNhom: "GP06",
        soPhanTuTrenTrang: pageSize,
        soTrang: current,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

// ADD MOVIE
export const addNewMovie = async (formData) => {
  try {
    const res = await requester({
      method: "POST",
      url: apiPath.ADD_MOVIE,
      data: formData,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

// UPDATE MOVIE
export const updateMovie = async (formData) => {
  try {
    const res = await requester({
      method: "POST",
      url: apiPath.UPDATE_MOVIE,
      data: formData,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

// DELETE MOVIE
export const deleteMovie = async (movieId) => {
  try {
    const res = await requester({
      method: "DELETE",
      url: apiPath.DELETE_MOVIE,
      params: {
        maPhim: movieId,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

// get API lấy thông tin hệ thống rạp
export const getCinemaList = async () => {
    try{
        const res = await requester({
            method: "GET",
            url: apiPath.CINEMA_LIST
        });
        return res;
    } catch(err) {
        console.log(err)
    }
};

// GET API lay thong tin cum rap theo he thong
export const getCinemGroup = async (id) => {
  try{
    const res = await requester({
      method: "GET",
      url: apiPath.CINEMA_GROUP,
      params: {
        maHeThongRap: id,
      }
    });
    return res;
  } catch(err) {
    console.log(err)
  }
}
// SHOWTIME
export const showtimeMovie = async (values) => {
  try {
    const res = await requester({
      method: "POST",
      url: apiPath.SHOWTIME,
      data: values,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
// movie detail
export const getMovieDetail = async(id) => {
  try{
    const res = await requester({
      method: "GET",
      url: apiPath.MOVIE_DETAIL,
      params: {
        maPhim: id
      }
    });
    return res;
  } catch(err) {
    console.log(err)
  }
}

// USER LIST
 export const getUserList = async (pageSize, current) => {
   try{
     const res = await requester({
       method: "GET",
       url: apiPath.USER_LIST,
       params: {
        maNhom: "GP06",
        soPhanTuTrenTrang: pageSize,
        soTrang: current,
      }
     });
     return res;
   } catch(err) {
     console.log(err)
   }
 }

//  DELETE USER
export const deleteUser = async (account) => {
  try{
    const res = await requester({
      method: "DELETE",
      url: apiPath.DELETE_USER,
      params: {
        TaiKhoan: account,
      }
    });
    return res
  } catch(err) {
    console.log(err);
  }
}

// get API lay danh sach loai nguoi dung
export const getTypeOfUser = async() => {
  try{
    const res = await requester({
      method: "GET",
      url: apiPath.TYPE_USER,
    });
    return res;
  } catch(err) {
    console.log(err)
  }
}

// ADD USER
export const addUser = async (values) => {
  try{
    const res = await requester({
      method: "POST",
      url: apiPath.ADD_USER,
      data: values,
    });
    return res;
  } catch(err) {
    console.log(err)
  }
};

// lay danh sach nguoi dung de search
export const getUserListSearch = async (keywords) => {
  try{
    const res = await requester({
      method: "GET",
      url: apiPath.SEARCH_USER_LIST,
      params: {
        maNhom: "GP06",
        tuKhoa: keywords,
      }
    });
    return res;
  } catch(err) {
    console.log(err)
  }
}

// POST API de cap nhat thong tin user
export const updateUser = async (values) => {
  try{
    const res = await requester({
      method: "POST",
      url: apiPath.UPDATE_USER,
      data: values,
    });
    return res;
  } catch(err) {
    console.log(err)
  }
}
