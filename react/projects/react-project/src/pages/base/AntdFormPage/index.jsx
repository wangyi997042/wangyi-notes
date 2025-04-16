import React, { Component, createRef, useRef, useState } from "react";
import { Button, Form, Input, Radio, Select, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


const nameRules = [{ required: true, message: "请输入姓名！" }];
const passwordRules = [{ required: true, message: "请输入密码！" }];

const FormItem = Form.Item;

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    sx: { span: 24 },
    sm: { span: 20 }
  }
}
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

function AntdFormPage() {
  const formRef = useRef()
  // const form = Form.useForm()
  const [formLayout, setFormLayout] = useState('horizontal');

  const onFinishFailed = (values) => {
    console.log("failed===", values);
  }
  const onReset = (values) => {
    console.log("reset===", values);
  }
  const onFinish = (values) => {
    console.log("finish===", values);
  }
  const onFill = () => {
    console.log(formRef);
    formRef.current.setFieldsValue({
      name: 'hello',
      password: '23'
    })
  }

  const onGenderChange = (val) => {
    const form = formRef.current;
    switch (val) {
      case 'male':
        form.setFieldsValue({
          name: 'hi man'
        });
        return
      case 'female':
        form.setFieldsValue({
          name: 'hi lady'
        })
        return
      case 'other':
        form.setFieldsValue({
          name: 'hi three'
        })
        return
      default: form.setFieldsValue({
        name: 'hi baby'
      })
    }

  }

  const onValuesChange = ({ layout }) => {
    setFormLayout(layout)
  }

  return <div style={{ width: '500px', border: '1px solid #333', margin: '20px auto', padding: '20px' }}>
    <h3>AntdFormPage</h3>
    <Form
      ref={formRef}
      // form={form}
      onFinishFailed={onFinishFailed}
      onFinish={onFinish}
      onReset={onReset}
      layout={formLayout}
      autoComplete="off"
      // labelCol={{
      //   span: 8
      // }}
      // wrapperCol={{
      //   span: 16
      // }}
      onValuesChange={onValuesChange}
      name="form_name"
    >
      <FormItem label="twoItem">
        <FormItem>
          <FormItem name={['twoItem', 'aaa']}>
            <Input />
          </FormItem>
          <FormItem name={['twoItem', 'bbb']}>
            <Input />
          </FormItem>
          <FormItem name={['twoItem1', 'aaa']}>
            <Input />
          </FormItem>
          <FormItem name={['twoItem1', 'bbb']}>
            <Input />
          </FormItem>
        </FormItem>
      </FormItem>
      {/* <Form.List
        name={"users"}
      >
        {
          (fields, { add, remove }, { errors }) => (
            <>
              {
                fields.map(({ key, name, fieldKey, ...resetField }) => (
                  <Space key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <FormItem
                      {...resetField}
                      name={[name, 'first']}
                      fieldKey={[fieldKey, 'first']}
                      rules={[
                        {
                          required: true, message: 'miss'
                        }
                      ]}
                    >
                      <Input placeholder="first" />
                    </FormItem>
                    <FormItem
                      {...resetField}
                      name={[name, 'last']}
                      fieldKey={[fieldKey, 'last']}
                      rules={[
                        {
                          required: true, message: 'miss last'
                        }
                      ]}
                    >
                      <Input placeholder="last" />
                    </FormItem>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))
              }
              <FormItem>
                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>add user</Button>
              </FormItem>
            </>
          )
        }

      </Form.List> */}
      {/* <Form.List
        name={"names"}
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 2) {
                return Promise.reject(new Error('至少两个乘客'))
              }
            }
          }
        ]}
      >
        {(fields, action, err) => (
          <>
            {
              fields.map((field, index) => {
                console.log('field====', field, action, err)
                return (
                  <FormItem
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'Passengers' : ''}
                    required={false}
                    key={field.key}
                  >

                    <FormItem
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: '请输入乘客姓名'
                        }
                      ]}
                      noStyle
                    >
                      <Input placeholder="乘客姓名" style={{ width: '60%' }} />
                    </FormItem>
                    {
                      fields.length > 1 ? (
                        <MinusCircleOutlined onClick={() => action.remove(field.name)} />
                      ) : null
                    }

                  </FormItem>
                )
              })
            }
            <FormItem>
              <Button type="dashed" icon={<PlusOutlined />} onClick={action.add} style={{ width: '60%', marginTop: '20px' }}>
                add
              </Button>
              <Button type="dashed" icon={<PlusOutlined />} onClick={() => action.add('默认值', 0)} style={{ width: '60%', marginTop: '20px' }}>
                add head
              </Button>
              <Form.ErrorList errors={err.errors} />
            </FormItem>
          </>
        )
        }
      </Form.List> */}
      <FormItem name="layout" label="layout">
        <Radio.Group value="formLayout">
          <Radio.Button value={'horizontal'}>
            Horizontal
          </Radio.Button>
          <Radio.Button value={'vertical'}>
            Vertical
          </Radio.Button>
          <Radio.Button value={'inline'}>
            Inline
          </Radio.Button>
        </Radio.Group>

      </FormItem>
      <FormItem name="name" label="姓名" rules={nameRules}>
        <Input />
      </FormItem>
      <FormItem name="password" label="密码" rules={passwordRules}>
        <Input.Password />
      </FormItem>
      {/* <FormItem name="confirm" label="confirm密码" rules={passwordRules} dependencies={['password']}>
        <Input.Password />
      </FormItem> */}
      <FormItem
        name={"gender"}
        label="Gender"
        rules={[{
          required: true
        }]}
      >
        <Select onChange={onGenderChange} allowClear>
          <Option value={'male'}>male</Option>
          <Option value={'female'}>female</Option>
          <Option value={'other'}>other</Option>
        </Select>

      </FormItem>
      <FormItem
        noStyle
        shouldUpdate={(preVal, newVal) => {
          console.log(preVal, newVal);
          return preVal.gender !== newVal.gender
        }}
      >
        {
          ({ getFieldValue }) => getFieldValue('gender') === 'other' ? (
            <FormItem name="customizeGender" label="customizeGender" rules={[{ required: true }]}>
              <Input />
            </FormItem>
          ) : null
        }
      </FormItem>

      <FormItem
        noStyle
        shouldUpdate={(preVal, newVal) => preVal.gender !== newVal.gender}
      >
        {({ getFieldValue }) => getFieldValue('gender') === 'other' ? (
          <FormItem name={'other'} label="other">
            <Input />
          </FormItem>
        ) : null}
      </FormItem>
      {/* <FormItem
        name="gender"
        label="Gender"
        rules={[{
          required: true
        }]}
      >
        <Select
          placeholder="select"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </FormItem>
      <FormItem
        noStyle
        shouldUpdate={(pre, newVal) => pre.gender !== newVal.gender}
      // dependencies="gender"
      >
        {
          ({ getFieldValue }) => getFieldValue('gender') === 'other' ? (
            <FormItem name="customizeGender" label="customizeGender" rules={[{ required: true }]}>
              <Input />
            </FormItem>
          ) : null
        }
      </FormItem> */}
      <FormItem>
        <Button type="primary" size="large" htmlType="submit">submit</Button>
        <Button type="primary" size="large" htmlType="reset">reset</Button>
        <Button type="link" size="large" htmlType="button" onClick={onFill}>fill form</Button>
      </FormItem>
    </Form>
  </div >;
}

// export default class AntdFormPage extends Component {
//   formRef = createRef();

//   componentDidMount() {
//     console.log('createRef===', this.formRef.current);
//   }
//   onFinish = (values) => {
//     console.log('finish====', values);
//   }
//   onReset = (values) => {
//     console.log('reset===', values);
//   }
//   onFinishFailed = (values) => {
//     console.log('failed=====', values);
//   }

//   render() {
//     return (
//       <div>
//         <h3>AntdFormPage</h3>
//         <Form ref={this.formRef} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed} onReset={this.onReset} labelAlign="left">
//           <FormItem name="name" label="姓名：" rules={nameRules}>
//             <Input placeholder="placeholder" />
//           </FormItem>
//           <FormItem name='password' label="密码：" rules={passwordRules}>
//             <Input placeholder="请输入密码" />
//           </FormItem>
//           <FormItem>
//             <Button type="primary" size="large" htmlType="submit">
//               submit
//             </Button>
//           </FormItem>
//           <FormItem>
//             <Button type="primary" size="large" htmlType="reset">
//               reset
//             </Button>
//           </FormItem>
//         </Form>
//       </div>
//     )
//   }
// }



export default AntdFormPage;
