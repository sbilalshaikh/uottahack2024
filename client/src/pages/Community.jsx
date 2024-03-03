import React, { useEffect, useState } from 'react'
import { Flex, Box } from '@chakra-ui/react';
import Gallery from '../components/community/Gallery';
import Chart from '../components/community/Chart';
import Events from '../components/community/Events';
import { useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
const Community = () => {
    const [community, setCommunity] = useState()
    const [flowers, setFlowers] = useState()
    const [members, setMembers] = useState()
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
                console.log(commmunityData)
                setCommunity(commmunityData.community)
                setFlowers(commmunityData.flowers)
                setMembers(commmunityData.members)

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
            <Flex>
                <Box>
                    
                    {community && <>
                    {console.log(community)}
                    <Chart score={community}/></>}
                </Box>

                <Box>
                    <Gallery images={flowers}/>
                </Box>
            </Flex>
            <Flex>
                <Events />
            </Flex>
        </Box>
    )
}

export default Community