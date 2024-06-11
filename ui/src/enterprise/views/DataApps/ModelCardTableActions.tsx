import {
  Box,
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { FiMoreHorizontal, FiEdit3, FiRepeat } from 'react-icons/fi';

const ModelCardTableActions = () => {
  return (
    <>
      <Popover closeOnEsc closeOnBlur>
        <PopoverTrigger>
          <Box>
            <Box
              cursor='pointer'
              px={3}
              ml={6}
              _hover={{ bgColor: 'gray.300', borderColor: 'gray.500' }}
              border='1px'
              borderColor='gray.400'
              borderStyle='solid'
              borderRadius='6px'
              height='32px'
              width='32px'
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              <Box>
                <FiMoreHorizontal />
              </Box>
            </Box>
          </Box>
        </PopoverTrigger>
        <PopoverContent w='182px' border='1px' borderColor='gray.400' borderStyle='solid' mr={8}>
          <PopoverBody margin={0} p={0}>
            <Button
              _hover={{ bgColor: 'gray.200' }}
              w='100%'
              py={3}
              px={2}
              display='flex'
              flexDir='row'
              alignItems='center'
              rounded='lg'
              onClick={() => {}}
              as='button'
              justifyContent='start'
              border={0}
              variant='shell'
              leftIcon={<FiEdit3 />}
              textColor='gray.600'
            >
              <Text size='sm' fontWeight='medium' color='black.500'>
                Edit Card
              </Text>
            </Button>
            <Button
              _hover={{ bgColor: 'gray.200' }}
              w='100%'
              py={3}
              px={2}
              display='flex'
              flexDir='row'
              alignItems='center'
              rounded='lg'
              onClick={() => {}}
              as='button'
              justifyContent='start'
              border={0}
              variant='shell'
              textColor='gray.600'
              leftIcon={<FiRepeat />}
            >
              <Text size='sm' fontWeight='medium' color='black.500'>
                Redeploy Card
              </Text>
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ModelCardTableActions;
