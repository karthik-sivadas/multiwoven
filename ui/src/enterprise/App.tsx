import { Routes, Route } from 'react-router-dom';
import { MAIN_PAGE_ROUTES } from '@/routes';
import { ENTERPRISE_ROUTES } from '@/enterprise/routes';
import { AUTH_ROUTES } from '@/enterprise/routes';
import MainLayout from '@/views/MainLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PageNotFound from '@/views/PageNotFound';
import Protected from '@/protected-route';
import { useEffect, useState } from 'react';
import mwTheme from '@/chakra.config';
import { ChakraProvider } from '@chakra-ui/react';
import { useConfigStore } from '@/enterprise/store/useConfigStore';
import Loader from '@/components/Loader';

const queryClient = new QueryClient();

const APPLICATION_ROUTES = [...MAIN_PAGE_ROUTES, ...ENTERPRISE_ROUTES];

const App = (): JSX.Element => {
  const setConfigs = useConfigStore((state) => state.setConfigs);
  const [theme, setTheme] = useState(mwTheme);
  const [fetchingEnv, setFetchingEnv] = useState(true);

  const { brandName = 'AI Squared', favIconUrl } = useConfigStore((state) => state.configs);

  useEffect(() => {
    if (document) {
      // Set document title using VITE_BRAND_NAME
      document.title = brandName;

      // Set the favicon
      const favicon = document?.getElementById('favicon') as HTMLLinkElement;
      if (favicon && favIconUrl > '') {
        favicon.href = favIconUrl;
      }
    }
  }, [brandName, favIconUrl]);

  // Listen for changes in the Zustand store and update the theme
  useEffect(() => {
    const unsubscribe = useConfigStore.subscribe((state) => {
      const extension = { ...theme };

      if (state.configs.brandColor > '') {
        extension.colors.brand[400] = state.configs.brandColor;
        extension.colors.brand[300] = state.configs.brandHoverColor;
      }
      setTheme(extension);
    });

    // Unsubscribe from store updates when the component unmounts
    return unsubscribe;
  }, []);

  useEffect(() => {
    (async () => {
      let serverEnvs: {
        VITE_API_HOST?: string;
        VITE_BRAND_NAME?: string;
        VITE_BRAND_COLOR?: string;
        VITE_BRAND_HOVER_COLOR?: string;
        VITE_LOGO_URL?: string;
        VITE_FAV_ICON_URL?: string;
      } = {};

      try {
        const response = await fetch('/env');
        serverEnvs = await response.json();
      } catch (err) {
        // show toast
      }

      setConfigs({
        apiHost: serverEnvs.VITE_API_HOST || import.meta.env.VITE_API_HOST,
        brandName: serverEnvs.VITE_BRAND_NAME || import.meta.env.VITE_BRAND_NAME,
        brandColor: serverEnvs.VITE_BRAND_COLOR || import.meta.env.VITE_BRAND_COLOR,
        brandHoverColor:
          serverEnvs.VITE_BRAND_HOVER_COLOR || import.meta.env.VITE_BRAND_HOVER_COLOR,
        logoUrl: serverEnvs.VITE_LOGO_URL || import.meta.env.VITE_LOGO_URL,
        favIconUrl: serverEnvs.VITE_FAV_ICON_URL || import.meta.env.VITE_FAV_ICON_URL,
      });
      setFetchingEnv(false);
    })();
  }, []);

  if (fetchingEnv) {
    return (
      <ChakraProvider theme={theme}>
        <Loader />
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {AUTH_ROUTES.map(({ url, component, name }) => (
            <Route path={url} element={component} key={name} />
          ))}

          <Route path='/' element={<MainLayout />}>
            {APPLICATION_ROUTES.map(({ url, component, name }) => (
              <Route path={url} key={name} element={<Protected>{component}</Protected>} />
            ))}
          </Route>

          <Route path='*' element={<PageNotFound />} />
        </Routes>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
