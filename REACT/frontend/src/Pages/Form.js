import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import '../Styles/Form.css'; // Import the CSS file
import axios from 'axios';

const MyForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
    try {
      // Make a POST request to your Node.js server
      const response = await axios.post('http://127.0.0.1:3001/adddata', values);

      // Handle the response as needed
      console.log('Server response:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="form-container">
      <Form form={form} onFinish={onFinish} className="styled-form">
        <Form.Item label="Name" name="Name" rules={[{ required: true, message: 'Please enter your name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Number" name="Number" rules={[{ required: true, message: 'Please enter your number' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="Email" rules={[{ required: true, message: 'Please enter your email' }]}>
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Father's Name" name="FatherName" rules={[{ required: true, message: "Please enter your father's name" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Age" name="Age" rules={[{ required: true, message: 'Please enter your age' }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MyForm;
