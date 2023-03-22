//验证用户名
export const testUserName = (username) => {
  const pattern = /[@#\$%\^&\*]+/g;
  return !pattern.test(username);
};

//验证密码
export const testPassword = (password) => {
  const pattern = /^[\da-zA-Z@#\$%\^&\*]{4,8}$/;
  return pattern.test(password);
};

// 验证电话号码
export const testPhone = (phone) => {
  const pattern =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

  return pattern.test(phone);
};
