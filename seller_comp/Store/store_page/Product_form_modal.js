import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { CheckIcon } from "@heroicons/react/solid";
import Product_form from "./Product_form";
function Product_form_modal({ store }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Add new Product
      </button>

      <Modal isOpen={isOpen} onClose={onClose} size="full" bg="gray.400">
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton />
          <div className="p-12 lg:w-1/2 mx-auto">
            <Product_form store={store} onClose={onClose} />
          </div>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Product_form_modal;
