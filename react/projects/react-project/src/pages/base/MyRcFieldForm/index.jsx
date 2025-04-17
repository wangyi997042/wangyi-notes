import React, { Component } from 'react';
import Form, { Field } from "rc-field-form"

import { Button, Input } from 'antd';

const userNameRules = { required: true, message: '用户名必填！！！' }
const passwordRules = { required: true, message: '密码必填！！！' }


export default function MyRcFieldForm() {
  const [form] = Form.useForm()
  console.log('Form', Form);
  console.log('form', form);

  const onFinish = val => {
    console.log('onFinish', val);
  }

  const onFinishFailed = val => {
    console.log('onFinishFaild', val);
  }

  return (
    <div>
      <h3>MyRcFieldForm</h3>
      <Form
        form={form}
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
      >
        <Field name={'username'} rules={[userNameRules]}>
          <Input placeholder='username' />
        </Field>
        <Field name='password' label='password' rules={[passwordRules]}>
          <Input placeholder='password' />
        </Field>

        <Button htmlType='submit'>submit</Button>
        <button>submit</button>

      </Form>
    </div>
  )
}

// export default class MyRcFieldForm extends Component {
//   formRef = React.createRef();

//   componentDidMount() {
//     this.formRef.current.setFieldsValue({
//       username: 'wangyi',
//       password: 'mima'
//     })
//   }


//   onFinish = (val) => {
//     console.log(val, this.formRef);
//   }

//   onValuesChange = (val, allVal) => {
//     console.log(val, allVal);
//   }

//   onFinishFailed = (val) => {
//     console.log(val);
//   }


//   render() {
//     return (
//       <div>
//         <h3>myRcFieldForm</h3>
//         <Form
//           ref={this.formRef}
//           onValuesChange={this.onValuesChange}
//           onFinish={this.onFinish}
//           onFinishFailed={this.onFinishFailed}
//         >
//           <Field name="username" label="username:" rules={userNameRules}>
//             <Input placeholder="Username" />
//           </Field>
//           <Field name={"password"} label="password:" rules={passwordRules}>
//             <Input placeholder='Password' />
//           </Field>
//           <button>submit</button>
//           <Field>

//             <Button htmlType='submit'>submit</Button>
//           </Field>
//         </Form>
//       </div>
//     )
//   }
// }

