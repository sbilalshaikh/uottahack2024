import React, { useState } from "react";

import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";

const SignUpCard = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    return (
    <VStack spacing="5px" color="black">
        <FormControl id="firstName" isRequired>
        <FormLabel color={"#F05941"}>First Name</FormLabel>
        <Input
            placeholder="Enter Your First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            color={"white"}
        />
        </FormControl>
        <FormControl id="lastName" isRequired>
        <FormLabel color={"#F05941"}>Last Name</FormLabel>
        <Input
            placeholder="Enter Your Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            color={"white"}
        />
        </FormControl>
        <FormControl id="username" isRequired>
        <FormLabel color={"#F05941"}>Username</FormLabel>
        <Input
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            color={"white"}
        />
        </FormControl>
        <FormControl id="email" isRequired>
        <FormLabel color={"#F05941"}>Email</FormLabel>
        <Input
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
                h="1.75rem"
                size="sm"
                onClick={() => setShow((prevShow) => !prevShow)}
            >
                {show ? "Hide" : "Show"}
            </Button>
            </InputRightElement>
        </InputGroup>
        </FormControl>
        <FormControl id="confirm-password" isRequired>
        <FormLabel color={"#F05941"}>Confirm Password</FormLabel>
        <InputGroup>
            <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password Again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            color={"white"}
            />
            <InputRightElement width="4.5rem">
            <Button
                h="1.75rem"
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
        _hover={{ bg: "#F05941" }}
        >
        Signup
        </Button>
    </VStack>
    );
};

export default SignUpCard;