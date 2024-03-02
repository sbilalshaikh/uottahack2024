import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Container,
  Text,
  Button,
  Avatar,
  Input,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import { PhoneIcon, QuestionIcon } from "@chakra-ui/icons";
import { Link as ChakraLink, Tooltip, useToast } from "@chakra-ui/react";

const Navbar = () => {
  const toast = useToast();
  const [isDropdownOpen, setDropdownOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState();
  const [profile, setProfile] = useState();

  return (
    <Box bg="#22092C" position={{ sm: "sticky" }} top={0} zIndex={2}>
      <Flex justify={{ base: "center", sm: "space-between" }}>
        <Box padding={"10px"} display={"flex"}>
          <Box
            pb={2}
            display={"flex"}
            justifyContent={{ base: "center", sm: "start" }}
            flexDir={{ base: "column", sm: "row" }}
            wrap={{ base: "nowrap", md: "wrap" }}
          >
            <Box maxW="200px" maxH="200px">
              
            </Box>

            <Input
              placeholder="Search Neighbourhood"
              borderRadius="md" // Adjust the border radius
              borderColor="teal.500" // Adjust the border color
              _focus={{
                borderColor: "teal.700", // Adjust the border color on focus
              }}
              _hover={{
                borderColor: "teal.600", // Adjust the border color on hover
              }}
              color={"white"}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              marginTop={{ sm: "30px" }}
              marginX={2}
            />

            <Box display="flex" flexBasis={{ sm: "50%" }}>
              <Button
                marginTop={{ base: "10px", sm: "30px" }}
                flexBasis={{ base: "90%" }}
                colorScheme="green"
                justifySelf={"start"}
                marginLeft={{ base: 5, sm: 0 }}
                onClick={handleSearch}
              >
                Search!
              </Button>
                          </Box>
          </Box>
        </Box>
        <Box
          marginTop="25px"
          flexBasis={"10%"}
          marginBottom={"10px"}
          marginLeft={{ base: "5px", sm: "0" }}
        >
        <Menu>
            {({ isOpen }) => (
            <>
                <MenuButton
                as={Avatar}
                boxSize={{ base: "2.5em", sm: "3em" }}
                src={profile}
                />
                <MenuList>
                <MenuItem>My Community</MenuItem>
                <MenuItem>Maps</MenuItem>
                </MenuList>
            </>
            )}
        </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
