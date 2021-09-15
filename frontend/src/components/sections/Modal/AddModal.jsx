// import React from 'react'

// function AddModal() {
//     return (
//         <div>
//             Add
//         </div>
//     )
// }

// export default AddModal


import React from 'react'

import {
    useDisclosure,
    Modal,
    Box,
    IconButton,
    ButtonGroup,
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
                    <ModalHeader>Edit</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel textTransform="uppercase">{field[0]}</FormLabel>
                            <Input name="name"  ref={initialRef} placeholder={text[0]} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel textTransform="uppercase">{field[1]}</FormLabel>
                            <Input name="isbn" placeholder={text[0]} />
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

export default AddModal;
