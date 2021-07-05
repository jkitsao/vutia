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
  //   Lorem,
} from "@chakra-ui/react";
import Create_store_form from "../create_store/Create_store_form";
function Create_store() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <>
        <button
          className="bg-gray-900 px-5 py-2 text-sm shadow-sm font-semibold tracking-wider text-white rounded-full hover:bg-gray-800"
          onClick={onOpen}
        >
          Create store
        </button>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          closeOnOverlayClick={false}
          size="full"
          // scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent bg="blackAlpha.800">
            {/* <ModalHeader>Modal Title</ModalHeader> */}
            <ModalCloseButton color="white" />
            {/* <ModalBody>

            </ModalBody> */}
            <section className="sm:w-3/4 sm:mx-auto lg:w-1/2 xl:w-2/5 my-10">
              <div className="py-4">
                <h2 className="text-3xl text-green-400 font-semibold text-center">
                  Create a store
                </h2>
              </div>
              <Create_store_form onClose={onClose} />
            </section>

            {/* <ModalFooter>
              
            </ModalFooter> */}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
}

export default Create_store;
