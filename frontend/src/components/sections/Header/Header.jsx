import React from 'react'

import { Center,Text } from "@chakra-ui/react"

function Header() {
    return (
        <nav>
            <Center  bg="gray.700" h="50px" w="100%" color="white">
                <Text fontSize="26px">
                    BookStore
                </Text>
            </Center> 
        </nav> 
    )
}

export default Header;
