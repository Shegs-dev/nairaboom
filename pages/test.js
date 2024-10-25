/* eslint-disable react/prop-types */
import React from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";

function Test() {
  const { isOpen: isOpenDel, onOpen: onOpenDel, onClose: onCloseDel } = useDisclosure();
  return (
    <div>
        tESTs
        <Button onClick={()=>onOpenDel()}>Open Modal</Button>
      <ConfirmationModal isOpen={isOpenDel} onClose={onCloseDel}/>
    </div>
  )
}
export default Test

export function ConfirmationModal({ post, onConfirm, isOpen,  onClose }) {
//   const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDelete = () => {
    onConfirm(post.id);
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete ?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
            <Button colorScheme="blue" ml={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}


