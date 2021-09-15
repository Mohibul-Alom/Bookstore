import React, { useState, useEffect } from "react";

import { Header } from "../../sections";
import { getBooks,postBook, deleteBooks } from "../../../api/book.api";

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
    Button,
    Link,

} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill, BsPlus } from "react-icons/bs";


const INITIAL_STATE = {
    _id: "",
    name: "",
    isbn: ""
}


function HomeLayout() {
    const [books, setBooks] = useState([]);
    const [state, setState] = useState(INITIAL_STATE);
    const [change,setChange] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef();
    const finalRef = React.useRef();

    useEffect(() => {
        (async () => {
          const data = await getBooks()
          setBooks(data);
          setChange(false);
        })()
      }, [change]);

    const reqDelete = (id,name) => {

        const book = { id }

        deleteBooks(book)
            .then(() => {
                setChange(true);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const inputChange = (e) => {
        const { name, value } = e.target;
        setState({...state,[name]:value});
    }

    const reqAdd = (e) => {

        if(state.name !== "" && state.isbn !== ""){
            postBook(state)
            .then(() => {
                onClose();
                setState(INITIAL_STATE);
                setChange(true);
            })
            .catch(err => console.log(err));
        } 

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
                                                    <Input name="name" value={state.name} ref={initialRef} placeholder="La cuenta atrás para el verano" onChange={inputChange} />
                                                </FormControl>

                                                <FormControl mt={4}>
                                                    <FormLabel>ISBN</FormLabel>
                                                    <Input name="isbn" value={state.isbn} placeholder="9788448028831" onChange={inputChange}/>
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
                        <Box mr="4">
                                    <Heading as="h3" size="lg">
                                        List
                                    </Heading>
                                </Box>

                            <Box>
                            <IconButton
                                        mt="1"
                                        size="sm"
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
                                                    <Input name="name" value={state.name} ref={initialRef} placeholder="La cuenta atrás para el verano" onChange={inputChange} />
                                                </FormControl>

                                                <FormControl mt={4}>
                                                    <FormLabel>ISBN</FormLabel>
                                                    <Input name="isbn" value={state.isbn} placeholder="9788448028831" onChange={inputChange}/>
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

                    {books.map((book) => {
                        return (
                            <div key={book._id}>
                                <Flex direction={{ base: "row", xxs: "column" }}>
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

                                                <Link href={`/book/${book._id}`}>
                                                        <IconButton
                                                            colorScheme="blue"
                                                            icon={<BsBoxArrowUpRight />}
                                                        />
                                                </Link>

                                                <IconButton colorScheme="green" icon={<AiFillEdit />} />
                                                <IconButton
                                                    colorScheme="red"
                                                    variant="outline"
                                                    icon={<BsFillTrashFill />}
                                                    onClick={(e) => {
                                                        reqDelete(book._id, book.name)
                                                    }}
                                                />
                                            </ButtonGroup>
                                        </Flex>
                                    </SimpleGrid>
                                </Flex>
                                <Divider />
                            </div>
                        );
                    })}
                </Stack>
            </Flex>
        </>
    );
}

export default HomeLayout;
