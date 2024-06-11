import { Box, Text, Grid, Image, Button } from '@chakra-ui/react';
import ContentContainer from '@/components/ContentContainer';
import TopBar from '@/components/TopBar';
import Extension from '@/assets/images/extension_da.svg';
import SalesforceIcon from '@/assets/images/salesforce_da.png';
import TableauIcon from '@/assets/images/tableau_da.svg';
import DynamicAppIcon from '@/assets/images/dynamic_da.svg';
import StatusTag from '@/components/StatusTag';
import { useNavigate } from 'react-router-dom';

const DATA_APPS = [
  {
    icon: Extension,
    name: 'Chrome Extension',
    description: 'Sync and visualize your data in Chrome',
    id: 1,
    ctaText: 'Manage',
    isConnected: true,
  },
  {
    icon: SalesforceIcon,
    name: 'Salesforce',
    description: 'Show enriched, actionable data in your CRM',
    id: 2,
    ctaText: 'Connect',
  },
  {
    icon: TableauIcon,
    name: 'Tableau',
    description: 'Real-time visual analytics for your data',
    id: 3,
    ctaText: 'Connect',
  },
  {
    icon: DynamicAppIcon,
    name: 'Microsoft Dynamics 365',
    description: 'Integrated data insights for your processes',
    id: 4,
    ctaText: 'Connect',
  },
];

const DataApps = () => {
  const navigate = useNavigate();
  return (
    <Box width='100%' display='flex' flexDirection='column' alignItems='center'>
      <ContentContainer>
        <TopBar
          name={'Data Apps'}
          ctaName=''
          ctaButtonVariant='solid'
          onCtaClicked={() => {}}
          isCtaVisible={false}
        />
        <Box display='flex'>
          <Grid
            templateColumns='repeat(auto-fit, minmax(min(300px, 100%), 1fr))'
            gap='24px'
            width='100%'
          >
            {DATA_APPS.map((dataApp) => (
              <Box
                key={dataApp.id}
                display='flex'
                flexDirection='column'
                alignItems='start'
                borderWidth='1px'
                borderStyle='solid'
                padding='20px'
                borderRadius='8px'
                borderColor='gray.400'
                _hover={{
                  backgroundColor: 'gray.200',
                }}
                background='gray.100'
              >
                <Box display='flex' justifyContent='space-between' width='100%'>
                  <Box
                    height='40px'
                    width='40px'
                    marginRight='10px'
                    borderStyle='solid'
                    borderWidth='1px'
                    borderColor='gray.400'
                    padding='5px'
                    borderRadius='8px'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    backgroundColor='gray.100'
                  >
                    <Image
                      src={dataApp.icon}
                      alt='source icon'
                      maxHeight='100%'
                      height='24px'
                      width='24px'
                    />
                  </Box>
                  {dataApp.isConnected && <StatusTag status='Connected' />}
                </Box>
                <Text fontWeight='semibold' size='lg' marginTop='12px'>
                  {dataApp.name}
                </Text>
                <Text fontWeight={400} size='sm' color='black.200'>
                  {dataApp.description}
                </Text>
                <Button
                  marginTop='20px'
                  variant='shell'
                  onClick={(e) => {
                    dataApp.isConnected ? navigate('chrome-extension') : e.preventDefault();
                  }}
                  color='black.500'
                  borderRadius='6px'
                  minWidth={0}
                  width='auto'
                >
                  {dataApp?.ctaText}
                </Button>
              </Box>
            ))}
          </Grid>
        </Box>
      </ContentContainer>
    </Box>
  );
};

export default DataApps;
