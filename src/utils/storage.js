//存储用户信息
export const saveUserInfo = (user) => {
  localStorage.setItem("userInfo", JSON.stringify(user));
};

//获取用户信息
export const getUserInfo = () => JSON.parse(localStorage.getItem("userInfo"));

//用户注销
export const userLogout = () => {
  localStorage.clear();
};
