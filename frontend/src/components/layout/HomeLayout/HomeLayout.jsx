import React, { useState, useEffect } from "react";

import { Header,EditModal } from "../../sections";
import { getBooks,postBook, deleteBooks, editBook } from "../../../api/book.api";

import {
    Text,
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
    const [edit,setEdit] = useState(false);

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

      useEffect(() => {
        const {_id,name,isbn} = state;
        const updateBook = {id:_id,name,isbn};
        if(_id !== ""){
            (async () => {
                await editBook(updateBook);
                setEdit(false);
              })()
              setChange(true);
        }
      },[edit,state]);


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
                                    <Heading as="h3" size="lg" color="white">
                                        List
                                    </Heading>
                                </Box>

                                <Box>
                                    <IconButton
                                        mt="2"
                                        size="xs"
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
        <Box bg="gray.800" h="100vh">
            <Header />
            <Flex
                
                w="full"
                bg="gray.800"
                p={50}
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
                                    <Heading as="h3" size="lg" color="white">
                                        List
                                    </Heading>
                                </Box>

                            <Box>
                            <IconButton
                                        mt="2"
                                        size="xs"
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
                                        <Text color="white">{book.name}</Text>
                                        <Spacer />
                                        <Spacer />

                                        <Flex justify={{ md: "end" }}>
                                            <ButtonGroup variant="solid" size="xs" spacing={3}>

                                                <Link href={`/book/${book._id}`}>
                                                        <IconButton
                                                            colorScheme="blue"
                                                            icon={<BsBoxArrowUpRight />}
                                                        />
                                                </Link>
                                                <EditModal edit={edit} setEdit={setEdit} form={book} state={state} setState={setState} />
                                                {/* <IconButton colorScheme="green" icon={<AiFillEdit />} /> */}
                                                <IconButton
                                                    colorScheme="red"
                                                    variant="outline"
                                                    mt="2px"
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
        </Box>
    );
}

export default HomeLayout;
