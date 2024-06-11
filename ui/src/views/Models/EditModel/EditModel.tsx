import DefineSQL from '../ModelsForm/DefineModel/DefineSQL';
import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { ModelAPIResponse, getModelById } from '@/services/models';
import { PrefillValue } from '../ModelsForm/DefineModel/DefineSQL/types';
import TopBar from '@/components/TopBar';
import ContentContainer from '@/components/ContentContainer';
import EntityItem from '@/components/EntityItem';
import Loader from '@/components/Loader';
import { Step } from '@/components/Breadcrumbs/types';
<<<<<<< HEAD
=======
import { useStore } from '@/stores';
import useQueryWrapper from '@/hooks/useQueryWrapper';
import { useRef } from 'react';
import { GetModelByIdResponse } from '../types';
>>>>>>> 1dfe46a8 (Fixed model query and page cache update issue (#185))

const EditModel = (): JSX.Element => {
  const params = useParams();
  const containerRef = useRef(null);

  const model_id = params.id || '';

<<<<<<< HEAD
  const { data, isLoading, isError } = useQuery({
    queryKey: ['modelByID'],
    queryFn: () => getModelById(model_id || ''),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
=======
  const { data, isLoading, isError } = useQueryWrapper<
    ModelAPIResponse<GetModelByIdResponse>,
    Error
  >(['modelByID', activeWorkspaceId, model_id], () => getModelById(model_id || ''), {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retryOnMount: true,
    refetchOnReconnect: true,
>>>>>>> 1dfe46a8 (Fixed model query and page cache update issue (#185))
  });

  const prefillValues: PrefillValue = {
    connector_id: data?.data?.attributes.connector.id || '',
    connector_icon: (
      <EntityItem
        name={data?.data?.attributes.connector.name || ''}
        icon={data?.data?.attributes.connector.icon || ''}
      />
    ),
    connector_name: data?.data?.attributes.connector.name || '',
    model_name: data?.data?.attributes.name || '',
    model_description: data?.data?.attributes.description || '',
    primary_key: data?.data?.attributes.primary_key || '',
    query: data?.data?.attributes.query || '',
    query_type: data?.data?.attributes.query_type || '',
    model_id: model_id,
  };

  const EDIT_QUERY_FORM_STEPS: Step[] = [
    {
      name: 'Models',
      url: '/define/models',
    },
    {
      name: data?.data?.attributes?.name || '',
      url: `/define/models/${model_id}`,
    },
    {
      name: 'Edit Query',
      url: '',
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <Box width='100%' display='flex' justifyContent='center'>
      <ContentContainer containerRef={containerRef}>
        <TopBar name='' breadcrumbSteps={EDIT_QUERY_FORM_STEPS} />
        <DefineSQL
          isFooterVisible={false}
          hasPrefilledValues={true}
          prefillValues={prefillValues}
          isUpdateButtonVisible={true}
          isAlignToContentContainer={true}
        />
      </ContentContainer>
    </Box>
  );
};

export default EditModel;
