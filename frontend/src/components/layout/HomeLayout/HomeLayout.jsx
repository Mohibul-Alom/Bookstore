import React, { useState, useEffect } from "react";

import { Header } from "../../sections";
import { getBooks, deleteBooks } from "../../../api/book.api";

import {
    Flex,
    Spacer,
    Modal,
    Box,
    Stack,
    Divider,
    Heading,
    SimpleGrid,
    ButtonGroup,
    IconButton,
    useDisclosure,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    Button

} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill, BsPlus } from "react-icons/bs";

function HomeLayout() {
    const [books, setBooks] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef()
    const finalRef = React.useRef()

    useEffect(() => {
        getBooks()
            .then((result) => {
                setBooks(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [books]);

    const reqDelete = (id) => {

        const book = { id }

        deleteBooks(book)
            .then((result) => {
                console.log("Eliminado correctamente");
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const reqAdd = (e) => {
        return console.log("Hola")
    }

    if (books.length === 0) {
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

                    <Stack direction={{ base: "row" }} w="50" shadow="dark-lg">

                        <SimpleGrid
                            textTransform="uppercase"
                            py={{ base: 1, md: 4 }}
                            px={{ base: 4, md: 10 }}
                            fontSize="md"
                            fontWeight="hairline"
                            display="table-header-group"
                        >

                            <Flex direction={{ base: "row", xxs: "column" }} w="full">
                                <Box mr="4">
                                    <Heading as="h3" size="lg">
                                        List
                                    </Heading>
                                </Box>

                                <Box>
                                    <IconButton
                                        colorScheme="orange"
                                        icon={<BsPlus />}
                                        onClick={onOpen} />

                                    <Modal
                                        initialFocusRef={initialRef}
                                        finalFocusRef={finalRef}
                                        isOpen={isOpen}
                                        onClose={onClose}
                                    >

                                        <ModalContent>
                                            <ModalHeader>Create Book</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody pb={6}>
                                                <FormControl>
                                                    <FormLabel>TITULO</FormLabel>
                                                    <Input ref={initialRef} placeholder="La cuenta atrás para el verano" />
                                                </FormControl>

                                                <FormControl mt={4}>
                                                    <FormLabel>ISBN</FormLabel>
                                                    <Input placeholder="9788448028831" />
                                                </FormControl>
                                            </ModalBody>

                                            <ModalFooter>
                                                <Button onClick={(e)=>{reqAdd(e)}} colorScheme="blue" mr={3}>
                                                    Save
                                                </Button>
                                                <Button onClick={onClose}>Cancel</Button>
                                            </ModalFooter>
                                        </ModalContent>

                                    </Modal>
                                </Box>
                            </Flex>


                        </SimpleGrid>

                    </Stack>

                </Flex>
            </>
        )
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
                        columns={{ base: 2, md: 4 }}
                        w={{ base: 120, md: "full" }}
                        textTransform="uppercase"
                        py={{ base: 1, md: 4 }}
                        px={{ base: 4, md: 10 }}
                        fontSize="md"
                        fontWeight="hairline"
                        display="table-header-group"
                    >
                        <Flex direction={{ base: "row", xxs: "column" }}>
                            <Heading as="h3" size="lg">
                                List
                            </Heading>
                            <Spacer />
                            <IconButton colorScheme="orange" icon={<BsPlus />} />
                        </Flex>

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
                                                    onClick={(e) => {
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
