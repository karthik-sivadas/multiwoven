import { useQuery } from '@tanstack/react-query';

import { SteppedFormContext } from '@/components/SteppedForm/SteppedForm';
import { getConnectorDefinition } from '@/services/connectors';
import { useContext } from 'react';
import { Box } from '@chakra-ui/react';

import FormFooter from '@/components/FormFooter';

import Loader from '@/components/Loader';
<<<<<<< HEAD:ui/src/views/Connectors/Destinations/DestinationsForm/DestinationConfigForm/DestinationConfigForm.tsx
import ContentContainer from '@/components/ContentContainer';
import SourceFormFooter from '@/views/Connectors/Sources/SourcesForm/SourceFormFooter';
import JSONSchemaForm from '@/components/JSONSchemaForm';
import { generateUiSchema } from '@/utils/generateUiSchema';
=======
import { processFormData } from '@/views/Connectors/helpers';
import ContentContainer from '@/components/ContentContainer';
import { generateUiSchema } from '@/utils/generateUiSchema';
import JSONSchemaForm from '@/components/JSONSchemaForm';
import { useStore } from '@/stores';
>>>>>>> 4dc44c9c (refactor(CE): Connector creation process):ui/src/views/Connectors/ConnectorConfigForm/ConnectorConfigForm.tsx

const ConnectorConfigForm = ({ connectorType }: { connectorType: string }): JSX.Element | null => {
  const { state, stepInfo, handleMoveForward } = useContext(SteppedFormContext);
  const { forms } = state;
<<<<<<< HEAD:ui/src/views/Connectors/Destinations/DestinationsForm/DestinationConfigForm/DestinationConfigForm.tsx
  const selectedDestination = forms.find(({ stepKey }) => stepKey === 'destination');
=======
  const selectedConnector = forms.find(
    ({ stepKey }) => stepKey === (connectorType === 'source' ? 'datasource' : connectorType),
  );
  const connector = selectedConnector?.data?.[
    connectorType === 'source' ? 'datasource' : connectorType
  ] as string;
  const activeWorkspaceId = useStore((state) => state.workspaceId);
>>>>>>> 4dc44c9c (refactor(CE): Connector creation process):ui/src/views/Connectors/ConnectorConfigForm/ConnectorConfigForm.tsx

  if (!connector) return null;

  const { data, isLoading } = useQuery({
<<<<<<< HEAD:ui/src/views/Connectors/Destinations/DestinationsForm/DestinationConfigForm/DestinationConfigForm.tsx
    queryKey: ['connector_definition', destination],
    queryFn: () => getConnectorDefinition('destination', destination),
    enabled: !!destination,
=======
    queryKey: ['connector_definition', connector, activeWorkspaceId],
    queryFn: () => getConnectorDefinition(connectorType, connector),
    enabled: !!connector && activeWorkspaceId > 0,
>>>>>>> 4dc44c9c (refactor(CE): Connector creation process):ui/src/views/Connectors/ConnectorConfigForm/ConnectorConfigForm.tsx
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loader />;

  const handleFormSubmit = async (formData: FormData) => {
    handleMoveForward(stepInfo?.formKey as string, formData);
  };

  const connectorSchema = data?.data?.connector_spec?.connection_specification;
  if (!connectorSchema) return null;

  const generatedSchema = generateUiSchema(connectorSchema);

  return (
    <Box display='flex' justifyContent='center' marginBottom='80px'>
      <ContentContainer>
        <Box backgroundColor='gray.200' padding='24px' borderRadius='8px'>
          <JSONSchemaForm
            schema={connectorSchema}
            uiSchema={generatedSchema}
            onSubmit={(formData: FormData) => handleFormSubmit(formData)}
          >
            <FormFooter
              ctaName='Continue'
              ctaType='submit'
              isContinueCtaRequired
              isDocumentsSectionRequired
              isBackRequired
            />
          </JSONSchemaForm>
        </Box>
      </ContentContainer>
    </Box>
  );
};

export default ConnectorConfigForm;
