import React, { useState, useEffect } from "react";
import { getBookById } from '../../../api/book.api'
import { useLocation } from 'react-router-dom';

import {
    Flex,
    Box,
    Table,
    Thead,
    Td,
    Tr,
    Th,
    Tbody
}from "@chakra-ui/react"

function DetailLayout() {

    const location = useLocation();
    const divitions = location.pathname.split("/", 3);
    const bookId = divitions[2];
    const [book, setBook] = useState({});

    useEffect(() => {
        getBookById(bookId)
            .then(data => {
                console.log(data);
                setBook(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <Flex justifyContent="center" alignItems="center"  >
            <Box w="50%">
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th>Title</Th>
                            <Th>ISBN</Th>
                            <Th>Author</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>{book.name}</Td>
                            <Td>{book.isbn}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Box>
        </Flex>
    )
}

export default DetailLayout
