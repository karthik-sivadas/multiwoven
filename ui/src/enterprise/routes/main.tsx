import { Suspense, lazy } from 'react';
const SignIn = lazy(() => import('@/enterprise/views/Authentication/SignIn'));
const SignUp = lazy(() => import('@/enterprise/views/Authentication/SignUp'));
const AccountVerify = lazy(() => import('@/enterprise/views/AccountVerify'));
const MLOps = lazy(() => import('@/enterprise/views/MLOps'));
const SetupDataApps = lazy(() => import('@/enterprise/views/DataApps/SetupDataApps'));

type MAIN_PAGE_ROUTES_ITEM = {
  name: string;
  url: string;
  component: JSX.Element;
};

interface SuspenseWithLoaderProps {
  children: React.ReactElement;
  redirectRoute: string;
}

const SuspenseWithLoader = ({ children }: SuspenseWithLoaderProps): JSX.Element => {
  return <Suspense>{children}</Suspense>;
};

export default SuspenseWithLoader;

export const AUTH_ROUTES: MAIN_PAGE_ROUTES_ITEM[] = [
  {
    name: 'Sign In',
    url: '/sign-in',
    component: (
      <SuspenseWithLoader redirectRoute='/sign-in'>
        <>
          <SignIn />
        </>
      </SuspenseWithLoader>
    ),
  },
  {
    name: 'Sign Up',
    url: '/sign-up',
    component: (
      <SuspenseWithLoader redirectRoute='/sign-up'>
        <>
          <SignUp />
        </>
      </SuspenseWithLoader>
    ),
  },
  {
    name: 'Account Verify',
    url: '/account-verify',
    component: (
      <SuspenseWithLoader redirectRoute='/account-verify'>
        <AccountVerify />
      </SuspenseWithLoader>
    ),
  },
];

export const ENTERPRISE_ROUTES: MAIN_PAGE_ROUTES_ITEM[] = [
  {
    name: 'ML Ops',
    url: '/ml-ops/*',
    component: (
      <SuspenseWithLoader redirectRoute='/ml-ops'>
        <MLOps />
      </SuspenseWithLoader>
    ),
  },
  {
    name: 'Data Apps',
    url: '/data-apps/*',
    component: (
      <SuspenseWithLoader redirectRoute='/data-apps'>
        <SetupDataApps />
      </SuspenseWithLoader>
    ),
  },
];
