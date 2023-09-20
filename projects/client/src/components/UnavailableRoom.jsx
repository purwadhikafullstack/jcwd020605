import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { useState } from "react";

export default function UnavailableRooms(props) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Modal isOpen={props.data.isOpen} onClose={props.data.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Unavailable Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <FormControl>
                <FormLabel>Date</FormLabel>
                <RangeDatepicker
                  selectedDates={props.data.selectedDates}
                  onDateChange={props.data.onDateChange}
                  closeOnSelect={true}
                  minDate={new Date()}
                  propsConfigs={{
                    inputProps: {
                      placeholder: "Date Range",
                    },
                  }}
                  configs={{
                    dateFormat: "dd/MM/yyyy",
                  }}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              w="full"
              isLoading={isLoading}
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  props.data.onClick();
                }, 2000);
              }}
            >
              Set Unavailable room
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
