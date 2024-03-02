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

const LoginCard = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
    


  return (
    <VStack spacing="5px" color="back">
      <FormControl id="email" isRequired>
        <FormLabel color={"#F05941"}>Email or Username</FormLabel>
        <Input
          placeholder="Enter Your Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          color={"white"}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel color={"#F05941"}>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            color={"white"}
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
        bg="#BE3144"
        width="100%"
        isLoading={loading}
        style={{ marginTop: 15 }}
        _hover={{bg: "#F05941"}}
      >
        Login
      </Button>
    </VStack>
  );
};

export default LoginCard;
