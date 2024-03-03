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
  useMediaQuery,
  Spacer
} from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons';

import { Link as ChakraLink, Tooltip, useToast } from "@chakra-ui/react";
import { Link } from 'react-router-dom';



const Navbar = () => {
  const toast = useToast();
  const [isDropdownOpen, setDropdownOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState();
  const [profile, setProfile] = useState();
  const [isSmallerThan768] = useMediaQuery('(max-width: 768px)');


  return (
    <Box bg="#D2E8C1" position={{ sm: "sticky" }} top={0} zIndex={2}>
      <Flex justify={{ base: "center", sm: "space-between" }} alignItems={{sm:"end"}}>
        
        <Box padding={2} display={"flex"}> 
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
              >
                Search!
              </Button>
            </Box>


            


          </Box>
        </Box>

        <Box padding={{base: 2, sm: 4}}
        justifySelf={"end"}>
        {isSmallerThan768 ? (
            <Menu>
              {({ isOpen }) => (
                <>
                <MenuButton
                    as={IconButton}
                    boxSize={{ base: '2.5em', sm: '3em' }}
                    icon={<HamburgerIcon />}
                    aria-label="Open menu" 
                    />
                  <MenuList>
                    <MenuItem>Maps</MenuItem>
                    <MenuItem>Community</MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
        ) : (
            // Render your box content for larger screens
            <Box display="flex" alignItems="center"

              marginTop={{ base: "5px", sm: "30px" }}
              flexBasis={{ base: "90%" }}
              colorScheme="green"
              justifySelf={"start"}
              marginLeft={{ base: 5, sm: 0 }}
              padding={'0.5rem 1rem'}
              color={'white'}
              background={'#22a363'}
              borderRadius={'0.3rem'}
              fontWeight={'medium'}

           >
              <Spacer />
              <Link to={"/map"} >
                Main Map
              </Link>
            </Box>
            
        )}



        
        </Box>
            
      </Flex>
    </Box>
  );
};

export default Navbar;
