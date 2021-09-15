import React, { useState, useEffect } from "react";

import {
    useDisclosure,
    Modal,
    Box,
    IconButton,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    Button,
} from "@chakra-ui/react";

import { BsPlus } from "react-icons/bs";

import { postAuthor } from "../../../api/author.api";
import { editBook } from "../../../api/book.api";

function AddModal(props) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef();
    const finalRef = React.useRef();

    const field = [];
    const text = [];

    for (const key in props.form) {
        field.push(key);
        text.push(props.form[key]);
    }

    const [state,setState] = useState(props.form);


    const inputChange = (e) => {
        const { name, value } = e.target;
        setState({...state,[name]:value});
    }


    const addAuthor = (e) => {

        props.setChange(false);

        if(state[0] !== "" && state[1] !== "" ){
            postAuthor(state)
            .then((data) =>{
                const updateBook = {};
                updateBook.id = props.bookId;
                updateBook.author = data._id;
                console.log(updateBook);
                editBook(updateBook).catch(err => {throw err});
                props.setChange(true);
                onClose();

            })
            .catch(err => console.log(err))
        }
        props.setChange(false);

    }


    return (
        <Box>

            <IconButton
                size="xs"
                colorScheme="green"
                icon={<BsPlus />}
                onClick={onOpen}
            />

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >

                <ModalContent>
                    <ModalHeader>ADD AUTHOR</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel textTransform="uppercase">{field[0]}</FormLabel>
                            <Input name={field[0]} value={state[0]} onChange={inputChange} ref={initialRef} placeholder={text[0]} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel textTransform="uppercase">{field[1]}</FormLabel>
                            <Input name={field[1]} value={state[1]} onChange={inputChange} placeholder={text[0]} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={(e)=>{addAuthor(e)}} colorScheme="blue" mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>

        </Box>
    )
}

export default AddModal;
