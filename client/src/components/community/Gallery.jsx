import React from 'react';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';

const Gallery = (props) => {
  const flowers = props.flowers;

  const totalImages = flowers.length;
  const imagesPerSet = 2;

  const [startIndex, setStartIndex] = useState(0);

  const handleDotClick = (index) => {
    setStartIndex(index * imagesPerSet);
  };

  const handleArrowClick = (direction) => {
    const newStartIndex =
      direction === 'next'
        ? Math.min(totalImages - imagesPerSet, startIndex + imagesPerSet)
        : Math.max(0, startIndex - imagesPerSet);
    setStartIndex(newStartIndex);
  };

  return (
    <Flex direction="column" align="center" m={4} borderRadius="lg">
    <Box background={"#BC6C25"} mb={4} borderRadius={"lg"} w="80%" textAlign={"center"}>
        <Text fontFamily={"Quicksand"} fontWeight={"bold"} fontSize={"30px"}>Flowers</Text>
    </Box>
      <Flex align="center" justify="space-between" wrap="wrap" p={4}>
        {flowers.slice(startIndex, startIndex + imagesPerSet).map((flower, index) => (
          <Flex key={index} direction="column" w="48%" h="48%" p={2} position="relative" borderRadius="md" overflow="hidden"
            transition="200ms"
            _hover={{
              transform: 'scale(1.05)'
            }}
            alignItems="center"
            bg="#FEFAE0" >

            <img
              src={"http://localhost:8000/" + flower.image}
              border="2px solid #000000"
              alt={`Flower ${index + 1}`}
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'cover'
              }}
            />
            <Text fontWeight="bold" color="#283618" fontFamily="Poppins">{flower.name}</Text>
          </Flex>
        ))}
      </Flex>
      <Flex align="center" justify="space-between" wrap="wrap" p={4}>
        <Button onClick={() => handleArrowClick('prev')} disabled={startIndex === 0} variant="outline" size="sm">
          ←
        </Button>
        {[...Array(Math.ceil(totalImages / imagesPerSet))].map((_, index) => (
          <Box
            key={index}
            as="button"
            w="2"
            h="2"
            borderRadius="50%"
            bg={startIndex === index * imagesPerSet ? 'teal.500' : 'gray.300'}
            onClick={() => handleDotClick(index)}
            mx={1}
          />
        ))}
        <Button onClick={() => handleArrowClick('next')} disabled={startIndex + imagesPerSet >= totalImages} variant="outline" size="sm">
          →
        </Button>
      </Flex>
    </Flex>
  );
};

export default Gallery;
