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
    key: 'status',
    name: 'Status',
  },
  {
    key: 'last_updated',
    name: 'Last Updated',
  },
  {
    key: '',
    name: '',
  },
];

export const MODEL_CARD_TABLE_DATA = [
  {
    card_name: 'Customers at High RIsk of Churn',
    type: 'Table',
    status: 'deployed',
    last_updated: '08/01/24',
    icon: FiBarChart2,
  },
  {
    card_name: 'Churn Score Distribution',
    type: 'Doughnut',
    status: 'deployed',
    last_updated: '08/01/24',
    icon: FiPieChart,
  },
  {
    card_name: 'Customer Churn Risk Levels',
    type: 'Bar',
    status: 'deployed',
    last_updated: '08/01/24',
    icon: FiColumns,
  },
];
