import React from 'react'
import { Flex, Button } from '@chakra-ui/react'
import { useState } from 'react';
const Gallery = (props) => {
    

    //get green score, get the flowers, and get the other stuff needed
    //setup chart.js
    //use Flexbox layout to plan the page
    const totalImages = 8;
    const imagesPerSet = 2;

    const [startIndex, setStartIndex] = useState(0);

    const displayImages = Array.from({ length: imagesPerSet }, (_, index) => startIndex + index);

    const handlePrevClick = () => {
        const newStartIndex = Math.max(0, startIndex - imagesPerSet);
        setStartIndex(newStartIndex);
    };

    const handleNextClick = () => {
        const newStartIndex = Math.min(totalImages - imagesPerSet, startIndex + imagesPerSet);
        setStartIndex(newStartIndex);
    };
  return (
    <Flex>
        <Flex align="center" spacing={4}>
            <Button onClick={handlePrevClick} disabled={startIndex === 0}>
                Previous
            </Button>

            <Button onClick={handleNextClick} disabled={startIndex + imagesPerSet >= totalImages}>
                Next
            </Button>
        </Flex>
    </Flex>
  )
}

export default Gallery