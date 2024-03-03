import React from 'react'

const Gallery = (props) => {
    
  return (
    <Flex>
        <Flex align="center" spacing={4}>
            <Button onClick={handlePrevClick} disabled={startIndex === 0}>
                Previous
            </Button>

            <Flex align="center" spacing={2}>
                {displayImages.map((imageIndex) => (
                <Image
                    key={imageIndex}
                    src={`path/to/image${imageIndex + 1}.jpg`} // Adjust the path accordingly
                    alt={`Image ${imageIndex + 1}`}
                    boxSize="200px"
                    objectFit="cover"
                />
                ))}
            </Flex>

            <Button onClick={handleNextClick} disabled={startIndex + imagesPerSet >= totalImages}>
                Next
            </Button>
        </Flex>
    </Flex>
  )
}

export default Gallery