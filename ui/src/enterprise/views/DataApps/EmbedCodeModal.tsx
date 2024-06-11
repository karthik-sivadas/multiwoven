import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
  Icon,
  ModalHeader,
} from '@chakra-ui/react';
import { FiCode, FiCopy } from 'react-icons/fi';

const EmbedCodeModal = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        height='32px'
        width='32px'
        marginRight='10px'
        borderStyle='solid'
        borderWidth='1px'
        borderColor='gray.500'
        borderRadius='8px'
        display='flex'
        justifyContent='center'
        alignItems='center'
        backgroundColor='gray.100'
        onClick={onOpen}
        cursor='pointer'
      >
        <Icon as={FiCode} boxSize='4' />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size='lg'>
        <ModalOverlay bg='blackAlpha.400' />

        <ModalContent>
          <ModalHeader paddingX='24px' paddingY='20px'>
            <Text fontWeight={700} size='xl' color='black.500' letterSpacing='-0.2px'>
              Embeddable Code
            </Text>
            <ModalCloseButton color='gray.600' />
          </ModalHeader>
          <ModalCloseButton color='gray.600' />
          <ModalBody pt={8} pb={0}>
            <Flex direction='column'>
              <Box
                width='100%'
                borderStyle='solid'
                borderWidth='1px'
                borderColor='gray.400'
                backgroundColor='gray.100'
                borderRadius='12px'
                padding='12px'
              >
                <Text color='black.200' size='md' fontWeight={400}>
                  {`<iframe
                    src='https://app.squared.ai/embed/a/dataapps/chromeextension/fdd74ce5-4a42-44df- a9f8-07ecd8d22d85'
                    title='Churn Dashboard'
                    style='width: 100%; height: 100%;'
                  ></iframe>`}
                </Text>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter pt={8} pb={8}>
            <Box w='full'>
              <Flex flexDir='row' justifyContent='end'>
                <Button
                  variant='solid'
                  color='white'
                  rounded='lg'
                  onClick={onClose}
                  letterSpacing='-0.14px'
                  leftIcon={<FiCopy color='gray.100' />}
                >
                  Copy Code
                </Button>
              </Flex>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EmbedCodeModal;
