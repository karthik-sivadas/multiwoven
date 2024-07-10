import { useUiConfig } from '@/utils/hooks';
import Sidebar from '@/views/Sidebar';
import { Box } from '@chakra-ui/layout';
import { Outlet } from 'react-router-dom';

const MainLayout = (): JSX.Element => {
  const { contentContainerId } = useUiConfig();
<<<<<<< HEAD
=======

  const setActiveWorkspaceId = useStore((state) => state.setActiveWorkspaceId);
  const activeWorkspaceId = useStore((state) => state.workspaceId);

  const showToast = useCustomToast();

  const {
    data,
    isLoading: workspaceDataIsLoading,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ['workspace'],
    queryFn: () => getWorkspaces(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const workspaceData = data?.data;

  useEffect(() => {
    if (workspaceData && workspaceData.length > 0 && +activeWorkspaceId === 0) {
      setActiveWorkspaceId(workspaceData[0]?.id);
    }
    setIsLoading(false);
  }, [workspaceData]);

  useEffect(() => {
    if (isError || (!data && isFetched)) {
      showToast({
        title: 'Error: Failed to fetch workspace details.',
        description: 'Failed to fetch workspace details.',
        status: CustomToastStatus.Error,
        position: 'bottom-right',
      });
    }
  }, [isError, data, isFetched, showToast]);

  if (isError || (!data && isFetched)) {
    return <ServerError />;
  }

  if (workspaceDataIsLoading || isLoading) {
    return <Loader />;
  }

>>>>>>> 51adddf3 (fix(CE): show server error if data is fetched and no data)
  return (
    <Box display='flex' width={'100%'} overflow='hidden' maxHeight='100vh'>
      <Sidebar />
      <Box
        pl={0}
        width={'100%'}
        maxW={'100%'}
        display='flex'
        flex={1}
        flexDir='column'
        className='flex'
        overflow='scroll'
        id={contentContainerId}
        backgroundColor='gray.200'
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
