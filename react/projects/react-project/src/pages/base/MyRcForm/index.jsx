import React, { Component, useState, useEffect } from 'react'
// import { createForm } from 'rc-form'
import createForm from "../components/my-rc-form"
import { Input, Button, Switch } from 'antd';

const nameRules = { required: true, message: "请输入姓名！" };
const passwordRules = { required: true, message: "请输入密码！" };

function Child(props) {
  console.log('child====', props);
  const [count, setCount] = useState(0)
  const countUp = () => {
    setCount(count + 1)
  }
  useEffect(() => {
    const { onChange } = props;
    onChange(count)
  }, [count])

  return (
    <div>
      <p>{props.value}</p>
      <Button onClick={countUp}>+</Button>
    </div>
  )
}

class MyRcForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    console.log('props===', this.props);
    const { form } = this.props;
    setTimeout(() => {
      form.setFieldValue('username', 'jiade')
      // form.setFieldsValue({
      //   username: 234
      // })
    }, 2000)
    setTimeout(() => {
      form.setFieldValue('pass', true)
    }, 2000)
  }
  submit = () => {
    const { form } = this.props;
    const { getFieldsValue, getFieldValue } = form;
    console.log('values====', getFieldsValue());
    console.log('pass', getFieldValue('pass'));
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    return (
      <div>
        <h3>MyRcForm</h3>
        {
          getFieldDecorator('username', {
            reules: [nameRules]
          })(<Input placeholder='Username' />)
        }

        {
          getFieldDecorator('pass', {
            initialValue: false
          })(<Switch />)
        }
        {/* {
          getFieldValue('pass') &&
          getFieldDecorator('password', {
            rules: [passwordRules]
          })(
            <Child placeholder='password' />
          )
        } */}
        <Button onClick={this.submit}>submit</Button>
      </div>
    )
  }
}

export default createForm(MyRcForm);
