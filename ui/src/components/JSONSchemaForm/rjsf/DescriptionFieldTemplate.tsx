import { DescriptionFieldProps, FormContextType, RJSFSchema, StrictRJSFSchema } from '@rjsf/utils';
import { Text } from '@chakra-ui/react';
import { useStore } from '@/stores';

export default function DescriptionFieldTemplate<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ description, id }: DescriptionFieldProps<T, S, F>) {
  if (!description) {
    return null;
  }

  const activeWorkspaceId = useStore.getState().workspaceId;

  if (typeof description === 'string') {
    return (
      <Text
        id={id}
        mt={2}
        mb={1}
        color='black.200'
        fontSize='b5'
        letterSpacing='b5'
        lineHeight='b5'
        maxWidth='700px'
      >
        {+activeWorkspaceId === 18
          ? description.replace('PostgreSQL', 'AIS Datastore')
          : description}
      </Text>
    );
  }

  return <>{description}</>;
}
