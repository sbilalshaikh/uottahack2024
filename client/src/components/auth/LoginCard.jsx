import React from 'react'

import { useState } from "react";
import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const loginSubmit = async () => {
        setLoading(true);
        if (
        !firstName ||
        !password
        ) {
        toast({
            title: "Please Fill all the Fields",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setLoading(false);
        return;
        }

        try {
        const config = {
            headers: {
            "Content-Type": "application/json",
            },
        };
    
        const login = await fetch("http://127.0.0.1:8000/user/login/", {
            headers: new Headers({ "content-type": "application/json" }),
            method: "POST",
            body: JSON.stringify({
            "email": email,
            "password": password,
        }),
      });

      const loginData = await login.json();


      if (!login.ok) {
        throw new Error(`${signUpData.error}`);
      }

      const access_token = loginData['access_token']
      console.log(access_token)

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      navigate(`/map/`);

    } catch (error) {
      toast({
        title: "Error Occured!!",
        status: "error",
        description: error.message,
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };


  return (
    <VStack spacing="5px" color="back">
      <FormControl id="email" isRequired>
        <FormLabel color={"#000000"}>Email or Username</FormLabel>
        <Input
          placeholder="Enter Your Email or Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          color={"black"}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel color={"#000000"}>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            color={"black"}
          />
          <InputRightElement width="4.5rem">
            <Button
              size="sm"
              onClick={() => setShow((prevShow) => !prevShow)}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        bg="#FFFFFF"
        width="100%"
        isLoading={loading}
        onClick={loginSubmit}
        style={{ marginTop: 15 }}
        _hover={{bg: "#f6fff0"}}
      >
        Login
      </Button>
    </VStack>
  );
};

export default LoginCard;
