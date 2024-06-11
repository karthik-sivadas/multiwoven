import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  VStack,
  Text,
  Box,
  Tag,
  Icon,
} from '@chakra-ui/react';
import MLOpsLanding from '@/assets/images/ml-ops-landing.svg';
import Table from '@/components/Table';

import { useStore } from '@/stores';
import ContentContainer from '@/components/ContentContainer';
import TopBar from '@/components/TopBar';
import StatusTag from '@/components/StatusTag';
import { StatusTagVariants } from '@/components/StatusTag/StatusTag';
import { FiBarChart2, FiPieChart, FiColumns } from 'react-icons/fi';

export const MODEL_CARD_TABLE_COLUMN = [
  {
    key: 'card_name',
    name: 'Card Name',
  },
  {
    key: 'type',
    name: 'Type',
  },
  {
    key: 'version',
    name: 'Version',
  },
  {
    key: 'status',
    name: 'Status',
  },
  {
    key: 'last_updated',
    name: 'Last Updated',
  },
];

export const MODEL_CARD_TABLE_DATA = [
  {
    card_name: 'Customers at High RIsk of Churn',
    type: 'Classification',
    status: 'Active',
    last_updated: '08/01/24',
    icon: FiBarChart2,
    version: '1.2.0',
  },
  {
    card_name: 'Churn Score Distribution',
    type: 'Clustering',
    status: 'Inactive',
    last_updated: '08/01/24',
    icon: FiPieChart,
    version: '2.1.1',
  },
  {
    card_name: 'Customer Churn Risk Levels',
    type: 'Recommendation',
    status: 'Inactive',
    last_updated: '08/01/24',
    icon: FiColumns,
    version: '1.0.3',
  },
];

const TableItem = ({ field, data }: any) => {
  switch (field) {
    case 'card_name':
      return <Text fontSize='sm'>{data.card_name}</Text>;
    case 'version':
      return <Text fontSize='sm'>{data.version}</Text>;
    case 'status':
      return (
        <StatusTag
          status={data.status}
          variant={data.status === 'Active' ? StatusTagVariants.success : StatusTagVariants.paused}
        />
      );
    case 'type':
      return (
        <Tag
          colorScheme='teal'
          size='xs'
          bgColor='gray.200'
          paddingX={2}
          fontWeight={600}
          borderColor='gray.500'
          borderWidth='1px'
          borderStyle='solid'
          height='22px'
          borderRadius='4px'
        >
          <Icon as={data.icon} />
          <Text size='xs' fontWeight='semibold' color='black.300' marginLeft='4px'>
            {data.type}
          </Text>
        </Tag>
      );
    case 'last_updated':
      return (
        <Text fontSize='sm' color='gray.700'>
          {data.last_updated}
        </Text>
      );
  }
};

const MLOps = () => {
  const activeWorkspaceId = useStore.getState().workspaceId;

  const rows = MODEL_CARD_TABLE_DATA?.map((data) => {
    return MODEL_CARD_TABLE_COLUMN.reduce(
      (acc, { key }) => ({
        ...acc,
        [key]: <TableItem field={key} data={data} />,
      }),
      {},
    );
  });

  const tableData = {
    columns: MODEL_CARD_TABLE_COLUMN,
    data: rows,
    error: '',
  };

  if (+activeWorkspaceId === 18) {
    return (
      <Box width='100%' display='flex' flexDirection='column' alignItems='center'>
        <ContentContainer>
          <TopBar
            name={'Registered ML Models'}
            ctaName=''
            ctaButtonVariant='solid'
            onCtaClicked={() => {}}
            isCtaVisible={false}
          />
          <Table data={tableData} />
        </ContentContainer>
      </Box>
    );
  }

  return (
    <Flex width='100%' height='100vh' alignContent='center' justifyContent='center'>
      <Center>
        <VStack>
          <Text color='brand.400' size='sm' fontWeight='bold' letterSpacing='2.24px'>
            AI Squared ML OPS
          </Text>
          <Heading size='md' fontWeight='bold' letterSpacing='-0.36px'>
            Activate AI models
          </Heading>
          <Heading size='md' fontWeight='bold' letterSpacing='-0.36px'>
            for your business application
          </Heading>
          <Text color='black.200' size='md' fontWeight={400}>
            Seamlessly integrate AI into your existing business workflows
          </Text>
          <Button
            onClick={() =>
              window.open('https://squared.ai/contact/', '_blank', 'noopener noreferrer')
            }
            variant='solid'
            w='fit'
            marginTop='32px'
            _focusVisible={{ bgColor: 'brand.400' }}
          >
            Contact Us
          </Button>
          <VStack marginTop='44px'>
            <Image src={MLOpsLanding} />
          </VStack>
        </VStack>
      </Center>
    </Flex>
  );
};

export default MLOps;
