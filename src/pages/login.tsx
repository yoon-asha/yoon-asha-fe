import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  const clickLogin = async () => {
    const res = await axios.post('http://localhost:3000/login', {
      // id: userId,
      // password: userPw,
    });
    try {
      setIsLogin(true);
      // router.push('/');
    } catch {
      (error: Error) => {
        console.log(error);
      };
    }
  };

  useEffect(() => {
    //login check
  });

  return (
    <>
      <Form>
        <Label htmlFor='userId'>아이디</Label>
        <TextInput type='text' name='userId' required minLength={5} maxLength={30} />
        <Margin />
        <Label htmlFor='userPw'>비밀번호</Label>
        <TextInput type='password' name='userPw' required minLength={8} maxLength={30} />
        <LoginButton type='submit' onClick={clickLogin}>
          로그인
        </LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 13px;
  color: #6c6c7d;
`;

const TextInput = styled.input`
  margin-top: 8px;
  padding: 16px;
  background: #f7f7fa;
  border-radius: 12px;
`;

const Margin = styled.div`
  margin: 8px 0;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  cursor: pointer;
  &:disabled {
    background-color: #e2e2ea;
  }
`;
