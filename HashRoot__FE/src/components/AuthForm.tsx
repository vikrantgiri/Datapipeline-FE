import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";

import { postLogin } from "../api/login-api";

const AuthForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = async (values: {
  //   username: string;
  //   password: string;
  // }) => {
  //   setError("");
  //   try {

  //     const res = await postLogin(values);

  //     if (res.success) {
  //       message.success("Login successful!");
  //       navigate("/dashboard");
  //     } else {
  //       setError(res.message ?? "Invalid credentials.");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setError("An error occurred while logging in.");
  //   }
  // };

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    setError("");
    try {
      const res = await postLogin(values);
      console.log(res?.data);

      if (res?.data?.access_token) {
        localStorage.setItem("access_token", res?.data?.access_token);

        message.success("Login successful!");
        navigate("/dashboard");
      } else {
        setError(res.message ?? "Invalid credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while logging in.");
    }
  };

  return (
    <Form
      name="login-form"
      onFinish={handleSubmit}
      layout="vertical"
      className="bg-gray-50 p-20 rounded-lg w-full max-w-md m-6"
    >
      <h2 className="text-2xl font-semibold mb-6">Login to your account</h2>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please enter your username!" }]}
      >
        <Input
          id="username"
          aria-label="username"
          placeholder="Enter your username"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password
          id="password"
          aria-label="password"
          placeholder="Enter your password"
        />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        block
        className="bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded-md transition"
      >
        Login
      </Button>
    </Form>
  );
};

export default AuthForm;
