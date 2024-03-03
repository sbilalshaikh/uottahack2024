import React, { useEffect, useState } from 'react'
import { Flex, Box, Text } from '@chakra-ui/react';
import Gallery from '../components/community/Gallery';
import Events from '../components/community/Events';
import { useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import BarChart from '../components/community/BarChart';
const Community = () => {
    const [community, setCommunity] = useState()
    const [flowers, setFlowers] = useState()
    const [members, setMembers] = useState()
    const [events, setEvents] = useState()
    const toast = useToast();
    
    //Fetch request to access the db and all information about a community
    const { name } = useParams();
        useEffect (() => {
        const loadCommunityInfo = async () => {
            
            try {
                const config = {
                    headers: {
                    "Content-Type": "application/json",
                    },
                };

                const commmunityInfo = await fetch(`http://127.0.0.1:8000/neighbourhood/get-community-info/?name=${name}`, {
                    headers: new Headers({ "content-type": "application/json" }),
                    method: "GET",
                })

                
                

                const commmunityData = await commmunityInfo.json();

                setCommunity(commmunityData.neighbourhood)
                setFlowers(commmunityData.flowers)
                setMembers(commmunityData.members)
                setEvents(commmunityData.events)

                if (!commmunityInfo.ok) {
                throw new Error(`${commmunityData.error}`);
                }
            } catch (error) {
             console.log("hello")
            }
        }
        loadCommunityInfo(); 
    }, []);
    
    

    return (
        <Box>
            <Flex flexDir={{"base": "column", "md": "row"}}>

                <Box padding={3} flexBasis={"50%"} textAlign={"center"} minH={"50%"}>
                    
                    {community && <>
                    <BarChart 
                    labels={[community.neighbourhood_name, "Ottawa", "World"]}
                    data={[community.ndvi, 0.6942, 0.6332]}
                    datasetLabel={"NDVI Scale"}
                    backgroundColor={"#2C4251"}
                    borderColor={"#74E7B9"}
                    />
                    </>}
                </Box>

                <Box flexBasis={"50%"}>
                    {flowers &&
                    <Gallery flowers={flowers}/>}
                </Box>
            </Flex>
            
            <Box display="flex" justifyContent={"center"}>
                <Box w={"60%"} bg={"#e9eba0"} textAlign={"center"}>
                    <Text fontSize={"50px"} fontFamily={"Quicksand"}>EVENTS</Text>
                </Box>
            </Box>
            <Box>
                {events && <Flex justifyContent={"space-around"}>
                {events.map((eventInfo, event_index) => (
                        <Box key={event_index} flexBasis={"45%"} p={3} bg>
                            <Events eventInfo={eventInfo}/>
                        </Box>
                    ))}
            </Flex>}
            </Box>
            
        </Box>
    )
}

export default Community