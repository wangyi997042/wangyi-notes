import { useState } from 'react';
import { history } from 'umi';
import { test } from 'myutils';
import { Switch, Form, Row, Col, Button, Input } from 'antd'

import styles from './index.less';

// 通用表单校验
const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
  // labelWrap: true,
};
export default function IndexPage() {
  const [form] = Form.useForm();
  const [count, setCount] = useState(0)
  const [countB, setCountB] = useState(0)
  // console.log(test(1));

  console.log('count===', count)
  const promiseClick = () => {
    Promise.resolve().then(() => {
      setCount(count + 1)
      setCountB(countB + 1)
      console.log('promiseClick===', count)
    })
  }

  const handleClick = () => {
    setCount(count + 1)
    setCountB(countB + 1)
    console.log('handleClick===', count)
  }

  return (
    <div>
      <h1 className={styles.title}>Page{count} B: {countB}</h1>
      <Button onClick={promiseClick}>
        promiseClick
      </Button>
      <Button onClick={handleClick}>
        handleClick
      </Button>
      <Form
        {...layout}
        form={form}
        onFinish={() => {
          form.validateFields()
            .then((values) => {
              console.log(values);

            })
        }}
      >
        <Row>
          <Col span={4}>
            <Form.Item
              label="我要测试一下"
              valuePropName="checked"
              name={"switch"}
              onClick={(e, a) => {
                e.preventDefault();
                // e.stopPropagation();
                // return false;
                console.log('click');

              }}
              trigger={'onClick'}
            >
              <Switch />
            </Form.Item>
            <Form.Item
              label="我要测试一下"
              name={"switch2"}
              onClick={(e, a) => {
                e.preventDefault();
                // e.stopPropagation();
                // return false;
                console.log('click');

              }}
              trigger={'onClick'}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
            >
              <Button htmlType="submit">submit</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div>{history.length}</div>
      <div>{history.location.pathname}</div>
      <Button onClick={() => {
        history.push('/bar')
      }}>bar</Button>
      <Button onClick={() => {
        history.push('/foo')
      }}>foo</Button>
    </div>
  );
}
