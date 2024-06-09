import { FormContextType, RJSFSchema, StrictRJSFSchema, TitleFieldProps } from '@rjsf/utils';
import { Box, Text } from '@chakra-ui/react';
import { useStore } from '@/stores';
export default function TitleFieldTemplate<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ id, title }: TitleFieldProps<T, S, F>) {
  const activeWorkspaceId = useStore.getState().workspaceId;
  return (
    <Box id={id} mb={6}>
      <Text size='md' fontWeight='semibold'>
        {+activeWorkspaceId === 18 && title.toLowerCase() === 'postgresql'
          ? 'AIS Datastore'
          : title}
      </Text>
    </Box>
  );
}
