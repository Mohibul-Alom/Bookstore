import React from 'react'

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

import { AiFillEdit } from "react-icons/ai";
import { BsPlus, BsFillTrashFill } from "react-icons/bs";

function EditModal(props) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef();
    const finalRef = React.useRef();

    const field = [];
    const text = [];

    for (const key in props.form) {
        field.push(key);
        text.push(props.form[key]);
    }

    return (
        <Box>

            <IconButton
                size="xs"
                colorScheme="green"
                icon={<AiFillEdit />}
                onClick={onOpen}
            />

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >

                <ModalContent>
                    <ModalHeader>Edit</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel textTransform="uppercase">{field[1]}</FormLabel>
                            <Input name="name"  ref={initialRef} placeholder={text[1]} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel textTransform="uppercase">{field[2]}</FormLabel>
                            <Input name="isbn" placeholder={text[2]} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>

        </Box>
    )
}

export default EditModal;