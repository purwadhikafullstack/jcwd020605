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

import { BiPencil } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function SpecialPrice(props) {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <>
      <Modal isOpen={props.data.isOpen} onClose={props.data.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Special Price</ModalHeader>
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
              <FormControl>
                <FormLabel>Special Price</FormLabel>
                <RadioGroup value={props.data.value}>
                  <Stack direction="row" spacing="4">
                    <Radio
                      value="1"
                      colorScheme={"facebook"}
                      onChange={props.data.setValue}
                    >
                      Nominal
                    </Radio>
                    <Radio
                      value="2"
                      colorScheme={"linkedin"}
                      onChange={props.data.setValue}
                    >
                      Percent
                    </Radio>
                  </Stack>
                </RadioGroup>
                <Input
                  mt={2}
                  type="number"
                  value={
                    props.data.value === "1"
                      ? props.data.nominal
                      : props.data.percent
                  }
                  onChange={
                    props.data.value === "1"
                      ? props.data.onChangeNominal
                      : props.data.onChangePercent
                  }
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              isLoading={isLoading}
              w="full"
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  props.data.onClick();
                }, 2000);
              }}
            >
              Set Special Price
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
