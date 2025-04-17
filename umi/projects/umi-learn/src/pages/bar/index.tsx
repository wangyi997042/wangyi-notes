import React from 'react';
import {Button} from "antd-mobile"

import {
  queryUserInfo,
  queryBar
} from "@/services/foo"

function Bar() {
  const getUserInfo = async () => {
    const info = await queryUserInfo()
    console.log('queryUserInfo====', info);
  }
  const getBar = async () => {
    const info = await queryBar()
    console.log('queryBar====', info);
  }
  return (
    <div>
      Bar
      <Button onClick={() => getUserInfo()}>用户信息</Button>
      <Button onClick={() => getBar()}>bar</Button>
    </div>
  );
}

export default Bar;
