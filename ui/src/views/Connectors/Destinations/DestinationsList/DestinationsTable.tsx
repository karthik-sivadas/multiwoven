import { useMemo } from 'react';

import Table from '@/components/Table';
import { Text } from '@chakra-ui/react';

import {
  ConnectorAttributes,
  ConnectorListResponse,
  ConnectorTableColumnFields,
} from '../../types';
import moment from 'moment';

import { CONNECTOR_LIST_COLUMNS } from '@/views/Connectors/constant';
import EntityItem from '@/components/EntityItem';
import Loader from '@/components/Loader';
import StatusTag from '@/components/StatusTag';
import { useStore } from '@/stores';

type TableItem = {
  field: ConnectorTableColumnFields;
  attributes: ConnectorAttributes;
};

type TableRow = {
  id: string;
  connector: unknown;
};

type DestinationTableProps = {
  handleOnRowClick: (args: TableRow) => void;
  destinationData: ConnectorListResponse;
  isLoading?: boolean;
};

const TableItem = ({ field, attributes }: TableItem): JSX.Element => {
  const activeWorkspaceId = useStore.getState().workspaceId;
  switch (field) {
    case 'name':
      return (
        <Text size='sm' fontWeight={600} color='black.500' letterSpacing='-0.14px'>
          {attributes.name}
        </Text>
      );
    case 'icon':
      return +activeWorkspaceId === 18 &&
        attributes?.connector_name.toLowerCase() === 'postgresql' ? (
        <EntityItem
          icon='https://squared.ai/wp-content/uploads/2024/03/apple-touch-icon.png'
          name='AIS Datastore'
        />
      ) : (
        <EntityItem icon={attributes?.[field]} name={attributes?.connector_name} />
      );

    case 'updated_at':
      return (
        <Text size='sm' color='gray.700' fontWeight={500}>
          {moment(attributes?.updated_at).format('DD/MM/YYYY')}
        </Text>
      );

    case 'status':
      return <StatusTag status='Active' />;

    default:
      return <Text size='xs'>{attributes?.[field]}</Text>;
  }
};

const DestinationsTable = ({
  handleOnRowClick,
  destinationData,
  isLoading,
}: DestinationTableProps): JSX.Element | null => {
  const connectors = destinationData?.data;

  const tableData = useMemo(() => {
    const rows = (connectors ?? [])?.map((connector) => {
      const { id, attributes } = connector;
      return CONNECTOR_LIST_COLUMNS.reduce(
        (acc, { key }) => ({
          [key]: <TableItem field={key} attributes={attributes} />,
          id,
          connector,
          ...acc,
        }),
        {},
      );
    });

    return {
      columns: CONNECTOR_LIST_COLUMNS,
      data: rows,
    };
  }, [destinationData]);

  if (!connectors || isLoading) {
    return <Loader />;
  }

  return <Table data={tableData} onRowClick={handleOnRowClick} />;
};

export default DestinationsTable;
