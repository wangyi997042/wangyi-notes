import React, { Component } from 'react';

function createForm(Cmp) {

  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.options = {}
    }
    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value })
    }
    getFieldDecorator = (field, option) => InputCmp => {
      this.options[field] = option
      return React.cloneElement(InputCmp, {
        name: field,
        value: this.state[field] || '',
        onChange: this.handleChange
      })
    }

    getFieldsValue = () => {
      return this.state;
    }
    getFieldValue = (name) => {
      return this.state[name]
    }
    setFieldsValue = (newStore) => { this.setState(newStore) }

    getForm = () => {
      return {
        form: {
          getFieldsValue: this.getFieldsValue,
          getFieldValue: this.getFieldValue,
          setFieldsValue: this.setFieldsValue,
          getFieldDecorator: this.getFieldDecorator
        }
      }
    }
    render() {
      return <Cmp {...this.props} {...this.getForm()} />
    }
  }
}

export default createForm;
