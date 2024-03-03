import React from 'react'
import { Box, Flex, Text, Image } from '@chakra-ui/react'
const Events = (props) => {
  const event = props.eventInfo
  console.log("hiya")
  return (
    <Box p={2}>
      <Flex direction={{"base": "column", "md": "row"}}>
        <Flex direction={"column"}>
          <Text fontFamily={"Quicksand"} fontWeight={"bold"}>{event.event_name}</Text>
          <Text fontFamily={"Quicksand"}>{event.date}</Text>
          <Text fontFamily={"Poppins"}>{event.description}</Text>
          <Text fontFamily={"Poppins"} fontWeight={"bold"}>{event.event_location}</Text>
        </Flex>
        <Flex>
          <Image src={"http://localhost:8000/" + event.pics} m={2} border='2px' borderColor='black'objectFit={"cover"} />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Events