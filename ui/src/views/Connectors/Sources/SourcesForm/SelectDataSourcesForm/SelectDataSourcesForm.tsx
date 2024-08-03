import { useContext } from 'react';
import { Box } from '@chakra-ui/react';
import { SteppedFormContext } from '@/components/SteppedForm/SteppedForm';
import { getConnectorsDefintions } from '@/services/connectors';
import { useQuery } from '@tanstack/react-query';
import { DatasourceType } from '@/views/Connectors/types';
import ContentContainer from '@/components/ContentContainer';
<<<<<<< HEAD
=======
import useQueryWrapper from '@/hooks/useQueryWrapper';
import EntityItem from '@/components/EntityItem';
>>>>>>> 13854b6d (feat(CE): connector placeholder image)

const SelectDataSourcesForm = (): JSX.Element => {
  const { stepInfo, handleMoveForward } = useContext(SteppedFormContext);

  const { data } = useQuery({
    queryKey: ['datasources', 'source'],
    queryFn: () => getConnectorsDefintions('source'),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    gcTime: Infinity,
  });

  const datasources = data?.data ?? [];

  const handleOnClick = (datasource: DatasourceType) => {
    if (stepInfo?.formKey) {
      handleMoveForward(stepInfo.formKey, datasource.name);
    }
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <ContentContainer>
        <Box
          display={{ base: 'block', md: 'grid' }}
          gridTemplateColumns='1fr 1fr'
          gap='24px'
          marginBottom='20px'
          paddingY='10px'
          width='100%'
        >
          {datasources.map((datasource) => (
            <Box
              key={datasource.name}
              display='flex'
              alignItems='center'
              borderWidth='thin'
              padding='20px'
              borderRadius='8px'
              cursor='pointer'
              borderColor='gray.400'
              _hover={{
                backgroundColor: 'gray.200',
              }}
              height='56px'
              onClick={() => handleOnClick(datasource)}
            >
              <EntityItem name={datasource.title} icon={datasource.icon} />
            </Box>
          ))}
        </Box>
      </ContentContainer>
    </Box>
  );
};

export default SelectDataSourcesForm;
