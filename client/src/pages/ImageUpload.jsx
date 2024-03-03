import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, VStack, Input, InputGroup, InputRightElement, Button, useToast, Select } from "@chakra-ui/react";

const ImageUpload = () => {
  const [file, setFile] = useState();
  const [community, setCommunity] = useState();
  const [communities, setCommunities] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await fetch("http://localhost:8000/neighbourhood/get-all");
        const data = await response.json();
        const neighborhoods = data.neighbourhoods.map(element => element.neighbourhood_name);
        setCommunities(neighborhoods);
      } catch (error) {
        console.error("Error fetching communities:", error);
        // You can display an error toast or handle the error in some other way
        toast({
          title: "Error",
          description: "Failed to fetch communities. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchCommunities();
  }, [toast]);

  const handleFileChange = (ev) => {
    setFile(ev.target.files[0]);
  };

  const handleUpload = () => {
    // You can implement your upload logic here
    if (file && community) {
      // For example, you can use the FormData API to upload the file along with the selected community
      const formData = new FormData();
      formData.append('file', file);
      formData.append('community', community);

      // Make a POST request to your server with the formData
      // For demonstration purposes, we'll just log the formData
      console.log(formData);
    } else {
      toast({
        title: "Error",
        description: "Please select a file and a community",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4}>
      <FormControl>
        <FormLabel>Select Community</FormLabel>
        <Select placeholder='Select option' value={community} onChange={(e) => setCommunity(e.target.value)}>
          {communities.map((community, index) => (
            <option key={index} value={community}>
              {community}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Upload Image</FormLabel>
        <InputGroup>
          <Input type="file" onChange={handleFileChange} />
          <InputRightElement width="4.5rem">
            <Button colorScheme="teal" size="sm" onClick={handleUpload}>
              Upload
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </VStack>
  );
};

export default ImageUpload;