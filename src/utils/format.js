//格式化日期
export const dateFormat = (date = "") => {
  return date.split(" ")[0];
};

//列表降序排列
export const listOrderByDesc = (list, key = "createTime") => {
  const res = [...list];
  return res.sort((a, b) => {
    let time1 = Date.parse(a[key]);
    let time2 = Date.parse(b[key]);
    return time2 - time1;
  });
};
//格式化地址
import { useCascaderAreaData } from "@vant/area-data";

export const addressFormat = () => {
  const list = useCascaderAreaData();
  let id = 1;
  const res = [];
  list.forEach((item) => {
    const obj = {};
    obj.text = item.text;
    if (item.children[0].text == item.text) {
      obj.children = item.children[0].children;
    } else {
      obj.children = item.children;
    }

    const children = obj.children.map((item) => ({ ...item, id: id++ }));
    obj.children = children;
    res.push(obj);
  });
  return res;
};
//计算两个时间差  返回天小时分钟
export const timediff = (start) => {
  start = new Date(start).getTime();
  let now = new Date().getTime();
  let timeStamp = now - start;
  let year = Math.floor(timeStamp / (12 * 30 * 24 * 60 * 60 * 1000));
  let month = Math.floor(timeStamp / (30 * 24 * 60 * 60 * 1000));
  let day = Math.floor(timeStamp / (24 * 60 * 60 * 1000));
  let hour = Math.floor(timeStamp / (60 * 60 * 1000));
  let minute = Math.floor(timeStamp / (60 * 1000));
  let second = Math.floor(timeStamp / 1000);

  return year
    ? `${year}年前`
    : month
    ? `${month}月前`
    : day
    ? `${day}天前`
    : hour
    ? `${hour}小时前`
    : minute
    ? `${minute}分钟前`
    : second
    ? `${second}秒前`
    : "刚刚";
};

//格式化题目列表
export const formatTopicList = (list) => {
  const res = [...list];

  res.forEach((obj) => {
    if (obj.topicList.length) {
      obj.topicList.forEach((item) => {
        let options = item["options"] + "";
        let scores = item["scores"] + "";
        item.options = options.split(",");
        item.scores = scores.split(",");
      });
    }
  });

  return res;
};

//格式化答案
export const formatAnswer = (answer) => {
  if (answer) {
    let segment = answer["segment"] + "";
    let result = answer["result"] + "";
    answer.segment = segment.split(",");
    answer.result = result.split(",");
  }

  return answer;
};

//格式化会话列表
export const formatSessionList = (sessionList, userId) => {
  // console.log(sessionList);
  const map = new Map();

  sessionList.forEach((item) => {
    map.set(item.sendId, []);
    map.set(item.receiveId, []);
  });

  sessionList.forEach((item) => {
    if (item.sendId == userId && map.has(item.receiveId)) {
      let val = map.get(item.receiveId);

      val.push({ content: item.content, sendTime: item.sendTime });
      map.set(item.sendId, val);
    }
    if (map.has(item.sendId)) {
      let val = map.get(item.sendId);
      val.push({ content: item.content, sendTime: item.sendTime });
      map.set(item.sendId, val);
    } else {
      map.set(item.sendId, [
        { content: item.content, sendTime: item.sendTime },
      ]);
    }
  });
  // console.log(map);

  const a = arrUnique(
    sessionList.filter((obj) => obj.receiveId == userId),
    "sendUsername"
  ).map((item) => ({
    ...item,
    content: arrUnique(map.get(item.sendId), "content"),
  }));
  const b = arrUnique(
    sessionList.filter((obj) => obj.sendId == userId),
    "receiveUsername"
  ).map((item) => ({
    ...item,
    sendId: item.receiveId,
    sendUsername: item.receiveUsername,
    receiveId: item.sendId,
    sendAvatar: item.receiveAvatar,
    content: arrUnique(map.get(item.receiveId), "content"),
  }));
  const list = arrUnique([...a, ...b], "sendUsername");
  // console.log(list);
  return list.filter((item) => item.sendId != userId);
};

export const arrUnique = (arr, key) => {
  const res = new Map();
  return arr.filter((item) => !res.has(item[key]) && res.set(item[key], 1));
};
