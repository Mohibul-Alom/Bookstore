import React, { useState, useEffect } from "react";
import { Link as ReachLink } from "react-router-dom";
import { getBookById } from '../../../api/book.api'
import { useLocation } from 'react-router-dom';


import { Header, EditAuthor, AddModal } from "../../sections";

import {
    Flex,
    Box,
    Table,
    Thead,
    Td,
    Tr,
    Th,
    Tbody,
    Center,
    ButtonGroup,
    IconButton,
    Button,
    Link

} from "@chakra-ui/react";

import { BsFillTrashFill, BsHouseDoor } from "react-icons/bs";

import { deleteAuthor } from "../../../api/author.api"

const INITIAL_AUTHOR = {
    firstName: "",
    lastName: "",
}


function DetailLayout() {

    const location = useLocation();
    const divitions = location.pathname.split("/", 3);
    const bookId = divitions[2];
    const [book, setBook] = useState({});
    const [author, setAuthor] = useState(INITIAL_AUTHOR);
    const [exists, setExists] = useState(false);
    const [change, setChange] = useState(false);


    useEffect(() => {
        getBookById(bookId)
            .then(data => {
                if (data.author) {
                    setExists(true);
                    setAuthor(data.author);
                }
                setBook(data);
                setChange(false);

            })
            .catch(err => {
                console.log(err);
            })
    }, [change, bookId])


    const reqDeleteAuthor = (id) => {
        const author = { id };
        deleteAuthor(author)
            .then(() => {
                setExists(false);
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <Header />

            <Center>
            <Flex justifyContent="center" alignItems="center" mt="5">

                <Link  as={ReachLink} to="/">
                    <Button
                        mr="5"
                        _focus={{textDecoration:"none"}}
                        size="xs"
                        colorScheme="green"
                        variant="outline"
                        rightIcon={<BsHouseDoor />}
                    >
                        Back To Home
                    </Button>
                </Link>

            </Flex>

            </Center>

            <Flex justifyContent="center" alignItems="center" mt="5">
                <Box w="lg">
                    <Table size="m">
                        <Thead>
                            <Tr>
                                <Th fontSize="l">Title</Th>
                                <Th fontSize="l">ISBN</Th>
                                <Th fontSize="l">Author</Th>
                                <Th fontSize="l"></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td fontSize="l">{book.name}</Td>
                                <Td fontSize="l">{book.isbn}</Td>
                                {exists === true &&
                                    <>
                                        <Td fontSize="l">
                                            {author.firstName} {author.lastName}
                                        </Td>
                                        <Td>
                                            <ButtonGroup variant="solid" size="sm" spacing={3}>

                                                <EditAuthor change={change} setChange={setChange} form={author} />

                                                <IconButton
                                                    mt="2px"
                                                    size="xs"
                                                    colorScheme="red"
                                                    variant="outline"
                                                    icon={<BsFillTrashFill />}
                                                    onClick={(e) => {
                                                        reqDeleteAuthor(author._id);
                                                    }}
                                                />

                                            </ButtonGroup>
                                        </Td>
                                    </>
                                }
                                {exists === false &&
                                    <Td>
                                        <AddModal change={change} setChange={setChange} form={INITIAL_AUTHOR} bookId={book._id} />
                                    </Td>
                                }

                            </Tr>
                        </Tbody>
                    </Table>
                </Box>
            </Flex>
        </>
    )
}

export default DetailLayout
