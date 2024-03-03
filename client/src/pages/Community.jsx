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
                setEvents(community.events)

                if (!commmunityInfo.ok) {
                throw new Error(`${commmunityData.error}`);
                }
            } catch (error) {
                toast({
                    title: "Error Occured!!",
                    status: "error",
                    description: error.error,
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                return
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
            <Flex>
                <Events events={events}/>
            </Flex>
        </Box>
    )
}

export default Community