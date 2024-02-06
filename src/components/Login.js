// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { useAxios } from '../utils/useAxios';
import ApiConfig from '../config/apiConfig';

const LOGIN_AXIOS_CONFIG = ApiConfig.AUTH.LOGIN;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState(null);
  const [loginError, setLoginError] = useState('');
  
  const [loginAxioConfig, setLogicAxiosConfig]=useState(null);
  const { response: loginData, error } = useAxios(loginAxioConfig);
  const navigate = useNavigate();

  const errorDiv = error 
        ? <Alert className="mb-2" color="red">
            Invalid Credentials
          </Alert> 
        : '';

  const handleLogin = async (e) => {
    // try {
      e.preventDefault();
        setLogicAxiosConfig({...LOGIN_AXIOS_CONFIG, data:{
          email,
          password,
        } });
  };
  useEffect(()=>{
    if (loginData) {
      const token = loginData.token;
      localStorage.setItem('login-token', token);
      navigate('/dashboard');
    }
  },[loginData])

  useEffect(()=>{
    if (error) {
       setLoginError(error);
    } 
   },[error]);

  return (
    <section className="h-screen">
      <div className="h-full">
      {/* <!-- Left column container with background--> */}
      <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="w-full"
            alt="Sample image"
          />
        </div>
        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
          <div className="container mx-auto py-4">
            <Card color="transparent" shadow={false}>
              <Typography variant="h2" color="blue-gray">Login</Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to Sign In.
              </Typography>
              <form className="mt-8 mb-1 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                  {errorDiv}
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Email
                  </Typography>
                  <Input  
                    value={email} onChange={(e) => setEmail(e.target.value)} 
                    size="lg"
                    placeholder="name@mail.com"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Password
                  </Typography>
                  <Input
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    size="lg"
                    placeholder="********"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                <Button className="mt-6" fullWidth onClick={handleLogin}>
                  Sign In
                </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Login;
