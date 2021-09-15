import React, { useState, useEffect } from "react";

import { Header } from "../../sections";
import { getBooks,deleteBooks } from "../../../api/book.api";

import {
    Flex,
    Spacer,
    Box,
    Stack,
    Divider,
    Heading,
    SimpleGrid,
    ButtonGroup,
    Button,
    IconButton,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";

function HomeLayout() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks()
            .then((result) => {
                setBooks(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const reqDelete = (id) =>{

        const book = {
            id
        }

            deleteBooks(book)
                .then((result) => {
                    console.log("Eliminado correctamente");
                })
                .catch((err) => {
                    console.log(err)
                })
    }

    return (
        <>
            <Header />
            <Flex
                w="full"
                bg="gray.800"
                p={50}
                alignItems="center"
                justifyContent="center"
            >
                <Stack direction={{ base: "column" }} w="50" shadow="dark-lg">
                    <SimpleGrid
                        spacingY={3}
                        columns={{ base: 1, md: 4 }}
                        w={{ base: 120, md: "full" }}
                        textTransform="uppercase"
                        py={{ base: 1, md: 4 }}
                        px={{ base: 4, md: 10 }}
                        fontSize="md"
                        fontWeight="hairline"
                        display="table-header-group"
                    >
                        <Heading as="h3" size="lg">
                            Books List
                        </Heading>
                    </SimpleGrid>

                    {books.map((book) => {
                        return (
                            <>
                                <Flex direction={{ base: "row", xxs: "column" }} key={book._id}>
                                    <SimpleGrid
                                        spacingY={3}
                                        columns={{ base: 3, md: 4 }}
                                        w="full"
                                        py={2}
                                        px={12}
                                        fontWeight="hairline"
                                    >
                                        <span>{book.name}</span>
                                        <Spacer />
                                        <Spacer />

                                        <Flex justify={{ md: "end" }}>
                                            <ButtonGroup variant="solid" size="sm" spacing={3}>
                                                <IconButton
                                                    colorScheme="blue"
                                                    icon={<BsBoxArrowUpRight />}
                                                />
                                                <IconButton colorScheme="green" icon={<AiFillEdit />} />
                                                <IconButton
                                                    colorScheme="red"
                                                    variant="outline"
                                                    icon={<BsFillTrashFill />}
                                                    onClick={(e)=>{
                                                        reqDelete(book._id)
                                                    }}
                                                />
                                            </ButtonGroup>
                                        </Flex>
                                    </SimpleGrid>
                                </Flex>
                                <Divider />
                            </>
                        );
                    })}
                </Stack>
            </Flex>
        </>
    );
}

export default HomeLayout;
