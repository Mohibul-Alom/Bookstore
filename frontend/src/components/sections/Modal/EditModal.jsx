import React, { useState } from "react";

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

import {putAuthor} from "../../../api/author.api"

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

    const id = props.form._id;


    const [myState,setMyState] = useState(props.form);


    const inputChange = (e) => {

        const { name, value } = e.target;
        setMyState({...myState,[name]:value});

    }

    const editAuthor = (e) => {
        onClose();
        props.setState(myState);
        props.setEdit(true);

        // props.setChange(false);

        // const {firstName,lastName} = state;
        // const updateAuthor = {id,firstName,lastName};


        // putAuthor(updateAuthor)
        //     .then((res) =>{
        //         props.setChange(true);
        //         onClose();  
        //     })
        //     .catch(err => console.log(err))
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
                            <Input name={field[1]} value={myState[1]} onChange={inputChange} ref={initialRef} placeholder={text[1]} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel textTransform="uppercase">{field[2]}</FormLabel>
                            <Input name={field[2]} value={myState[2]} onChange={inputChange} placeholder={text[2]} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={(e)=>{editAuthor(e)}} colorScheme="blue" mr={3}>
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