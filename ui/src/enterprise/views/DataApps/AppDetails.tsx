import ContentContainer from '@/components/ContentContainer';
import TopBar from '@/components/TopBar';
import { Step } from '@/components/Breadcrumbs/types';
import Table from '@/components/Table';
import { Text, Tag, Icon } from '@chakra-ui/react';

import EmbedCodeModal from './EmbedCodeModal';
import { MODEL_CARD_TABLE_COLUMN, MODEL_CARD_TABLE_DATA } from './constants';
import StatusTag from '@/components/StatusTag';
import { StatusTagVariants } from '@/components/StatusTag/StatusTag';
import ModelCardTableActions from './ModelCardTableActions';

const EDIT_SYNC_FORM_STEPS: Step[] = [
  {
    name: 'Data Apps',
    url: '/data-apps/list',
  },
  {
    name: 'Chrome Extension',
    url: '',
  },
];

const TableItem = ({ field, data }: any) => {
  switch (field) {
    case 'card_name':
      return <Text fontSize='sm'>{data.card_name}</Text>;
    case 'status':
      return <StatusTag status={data.status} variant={StatusTagVariants.info} />;
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
    case '':
      return <ModelCardTableActions />;
  }
};

const AppDetails = () => {
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

  return (
    <ContentContainer>
      <TopBar
        name='Model Cards'
        breadcrumbSteps={EDIT_SYNC_FORM_STEPS}
        extra={<EmbedCodeModal />}
      />
      <Table data={tableData} />
    </ContentContainer>
  );
};

export default AppDetails;
