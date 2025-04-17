import React from 'react';
import { useModel, useAccess, request } from 'umi';
import { Button } from "antd-mobile";
import { getPage } from "@aaa/utils"


import {
  getCode
} from "@/services/code"

function Foo() {

  // const {initialState} = useModel('@@initialState');
  // const {user} = useModel('useAuthModel');
  // const access = useAccess()
  // console.log('initialState====', initialState);
  // console.log('user====', user);
  // console.log('useAccess=====', access)
  console.log(getPage());

  const onClick = () => {
    console.log('onClick====');
    getCode()
  }

  const onClickRequest = () => {
    request('/foo/users', {
      method: "get"
    })
      .then((res: any) => {
        console.log('res=====', res);
      })
      .catch((e) => {
        console.log('e===', e);
      })
  }


  return (
    <div>
      Foo
      <Button type='primary' onClick={() => onClick()}>确定</Button>
      <Button onClick={() => onClickRequest()}>request</Button>
    </div>
  );
}

export default Foo;
