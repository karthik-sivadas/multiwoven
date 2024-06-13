import TopBar from '@/components/TopBar';
import { getSyncById } from '@/services/syncs';
import { Box, Divider, TabIndicator, TabList, Tabs, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import MappedInfo from '../EditSync/MappedInfo';
import moment from 'moment';
import SyncActions from '../EditSync/SyncActions';
import ContentContainer from '@/components/ContentContainer';
import { useEffect, useState } from 'react';
import EditSync from '../EditSync';
import TabItem from '@/components/TabItem';
import Loader from '@/components/Loader';
import SyncRuns from '../SyncRuns';
import { Step } from '@/components/Breadcrumbs/types';
import useCustomToast from '@/hooks/useCustomToast';
import { CustomToastStatus } from '@/components/Toast';

enum SyncTabs {
  Tab1 = 'runs',
  Tab2 = 'config',
}

const ViewSync = (): JSX.Element => {
  const [syncTab, setSyncTab] = useState<SyncTabs>(SyncTabs.Tab1);
  const { syncId } = useParams();
  const toast = useCustomToast();

  const {
    data: syncFetchResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['sync', syncId],
    queryFn: () => getSyncById(syncId as string),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!syncId,
  });

  const syncData = syncFetchResponse?.data?.attributes;

  const EDIT_SYNC_FORM_STEPS: Step[] = [
    {
      name: 'Syncs',
      url: '/activate/syncs',
    },
    {
      name: 'Sync ' + syncId,
      url: '',
    },
  ];

  useEffect(() => {
    if (isError) {
      toast({
        status: CustomToastStatus.Error,
        title: 'Error!',
        description: 'Something went wrong',
        position: 'bottom-right',
        isClosable: true,
      });
    }
  }, [isError]);

  return (
    <ContentContainer>
      {isLoading || !syncData ? <Loader /> : null}
      <TopBar
        name='Sync'
        breadcrumbSteps={EDIT_SYNC_FORM_STEPS}
        extra={
          syncData?.model ? (
            <Box display='flex' alignItems='center'>
              <MappedInfo
                source={{
                  name: syncData?.model.connector.name,
                  icon: syncData?.model.connector.icon,
                }}
                destination={
                  +activeWorkspaceId === 18 &&
                  syncData?.destination?.name?.toLowerCase() === 'supabase'
                    ? {
                        name: syncData?.destination.name,
                        icon: 'https://squared.ai/wp-content/uploads/2024/03/apple-touch-icon.png',
                      }
                    : {
                        name: syncData?.destination.name,
                        icon: syncData?.destination.icon,
                      }
                }
              />
              <Divider
                orientation='vertical'
                height='24px'
                borderColor='gray.500'
                opacity='1'
                marginX='13px'
              />
              <Text size='sm' fontWeight='medium'>
                Sync ID :{' '}
              </Text>
              <Text size='sm' fontWeight='semibold'>
                {syncId}
              </Text>
              <Divider
                orientation='vertical'
                height='24px'
                borderColor='gray.500'
                opacity='1'
                marginX='13px'
              />
              <Text size='sm' fontWeight='medium'>
                Last updated :{' '}
              </Text>
              <Text size='sm' fontWeight='semibold'>
                {moment(syncData.updated_at).format('DD/MM/YYYY')}
              </Text>
              <SyncActions />
            </Box>
          ) : null
        }
      />
      <Tabs
        size='md'
        variant='indicator'
        background='gray.300'
        padding='4px'
        borderRadius='8px'
        borderStyle='solid'
        borderWidth='1px'
        borderColor='gray.400'
        width='fit-content'
        height='fit'
      >
        <TabList gap='8px'>
          <TabItem text='Sync Runs' action={() => setSyncTab(SyncTabs.Tab1)} />
          <TabItem text='Configuration' action={() => setSyncTab(SyncTabs.Tab2)} />
        </TabList>
        <TabIndicator />
      </Tabs>
      {syncTab === SyncTabs.Tab1 ? <SyncRuns /> : <EditSync />}
    </ContentContainer>
  );
};

export default ViewSync;
