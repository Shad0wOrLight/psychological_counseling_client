//根据资讯的作者id查找用户
export const findUserNameById = (userList, newsList) => {
  const list = [...newsList];
  list.forEach((news) => {
    news.tags = news.tags.split(",");
  });

  userList.forEach(({ uid, username }) => {
    list.forEach((news) => {
      if (news.userId == uid) {
        news.author = username;
      }
    });
  });
  return list;
};

//查询城市
export const findAddress = (list, addr) => {
  let address = addr.split(" ")[1];
  let arr = ["北京市", "天津市", "上海市", "重庆市"];
  if (arr.includes(address)) {
    return addr.split(" ")[2];
  } else {
    return addr.split(" ")[1];
  }
};

//查询城市对应id
export const findAddressId = (list, addr) => {
  const address = findAddress(list, addr);
  let id = 1,
    count = 0;
  list.forEach((item) => {
    item.children.forEach((obj) => {
      count++;
      if (obj.text == address) {
        id = count;
      }
    });
  });
  return id;
};

//查询城市对应索引
export const findAddressIndex = (list, addr) => {
  const address = findAddress(list, addr);
  let index = 0;
  list.forEach((item, i) => {
    item.children.forEach((obj) => {
      if (obj.text == address) {
        index = i;
      }
    });
  });
  return index;
};

//查询帖子作者
export const findArticleAuthor = (list, uid) => {
  const obj = list.find((item) => item.uid == uid);
  return obj?.username;
};

//根据分数计算测试结果
export const getResultByScore = (score, answer) => {
  let res = "";
  answer.segment.forEach((item, i) => {
    let num = item.split("~");
    let m = +num[0];
    let n = +num[1];
    if (score <= n && score >= m) {
      res = answer.result[i];
    }
  });
  return res;
};

//根据结果查询描述
export const getDescByResult = (res, list) => {
  let result = "";
  list.forEach((item) => {
    item.results.forEach((obj) => {
      if (obj.text == res) {
        result = obj.desc;
      }
    });
  });
  return result;
};
