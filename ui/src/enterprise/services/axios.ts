import axios from 'axios';
import Cookies from 'js-cookie';
import { useConfigStore } from '@/enterprise/store/useConfigStore';
import { useStore } from '@/stores';

export interface ApiResponse {
  success: boolean;
  data?: any;
  links?: Record<string, string>;
}

// Function to create axios instance with the current apiHost
function createAxiosInstance(apiHost: string) {
  const instance = axios.create({
    baseURL: `${apiHost}`,
  });

  instance.interceptors.request.use(function requestSuccess(config) {
    const token = Cookies.get('authToken');
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Workspace-Id'] = useStore.getState().workspaceId;
    config.headers['Accept'] = '*/*';
    return config;
  });

  instance.interceptors.response.use(
    function responseSuccess(config) {
      return config;
    },
    function responseError(error) {
      if (error && error.response && error.response.status) {
        switch (error.response.status) {
          case 401:
            if (window.location.pathname !== '/sign-in') {
              window.location.href = '/sign-in';
              Cookies.remove('authToken');
              useStore.getState().clearState();
            }
            break;
          case 403:
            break;
          case 501:
            break;
          case 500:
            break;
          default:
            break;
        }
      }
      return error.response;
    },
  );

  return instance;
}

let enterpriseAxiosInstance = createAxiosInstance(
  useConfigStore.getState().configs.apiHost + '/enterprise/api/v1/',
);

// Subscribe to changes in the Zustand store and recreate axios instance when apiHost changes
useConfigStore.subscribe((state) => {
  enterpriseAxiosInstance = createAxiosInstance(state.configs.apiHost + '/enterprise/api/v1/');
});

type MultiwovenFetchProps<PayloadType> = {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  data?: PayloadType;
};

export const enterpriseMultiwovenFetch = async <PayloadType, ResponseType>({
  url,
  method,
  data,
}: MultiwovenFetchProps<PayloadType>): Promise<ResponseType> => {
  if (method === 'post') return enterpriseAxiosInstance.post(url, data).then((res) => res?.data);

  if (method === 'put') return enterpriseAxiosInstance.put(url, data).then((res) => res?.data);

  if (method === 'delete') return enterpriseAxiosInstance.delete(url).then((res) => res?.data);

  if (method === 'patch') return enterpriseAxiosInstance.patch(url, data).then((res) => res?.data);

  return enterpriseAxiosInstance.get(url).then((res) => res?.data);
};
