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

  const { data } = useQuery({
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

  if (isLoading) {
    return <Loader />;
  }

>>>>>>> c41c2678 (fix(CE): UI Maintainability and workspace id on page refresh (#228))
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
