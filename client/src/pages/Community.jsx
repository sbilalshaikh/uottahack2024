import React, { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Button
} from "@chakra-ui/react";import Gallery from '../components/community/Gallery';
import Gallery from '../components/community/Gallery';
import Chart from '../components/community/Chart';
import Events from '../components/community/Events';

const Community = () => {
    const [community, setCommunity] = useState()
    const [flowers, setFlowers] = useState()
    const [members, setMembers] = useState()
    //Fetch request to access the db and all information about a community
    const { name } = useParams();
        useEffect = () => {
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
                    return;
                };
            loadCommunityInfo();
        }
    }
    
    //get green score, get the flowers, and get the other stuff needed
    //setup chart.js
    //use Flexbox layout to plan the page

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
        <Box>
            <Flex>
                <Box>
                    <Chart score={community.nvdi}/>
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