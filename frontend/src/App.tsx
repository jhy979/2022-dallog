import { AxiosError } from 'axios';
import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import useSnackBar from '@/hooks/useSnackBar';

import ErrorBoundary from '@/components/@common/ErrorBoundary/ErrorBoundary';
import NavBar from '@/components/NavBar/NavBar';
import ProtectRoute from '@/components/ProtectRoute/ProtectRoute';
import SnackBar from '@/components/SnackBar/SnackBar';
import CategoryPage from '@/pages/CategoryPage/CategoryPage';
import MainPage from '@/pages/MainPage/MainPage';

import { PATH } from '@/constants';
import { ERROR_MESSAGE } from '@/constants/message';

const AuthPage = lazy(() => import('@/pages/AuthPage/AuthPage'));
const SideBar = lazy(() => import('@/components/SideBar/SideBar'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage/NotFoundPage'));
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage/PrivacyPolicyPage'));

function App() {
  const { openSnackBar } = useSnackBar();

  const onError = (error: unknown) =>
    error instanceof AxiosError
      ? openSnackBar(error.response?.data.message ?? ERROR_MESSAGE.DEFAULT)
      : openSnackBar(ERROR_MESSAGE.DEFAULT);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        retryDelay: 0,
        onError,
        staleTime: 1 * 60 * 1000,
      },
      mutations: {
        retry: 1,
        retryDelay: 0,
        onError,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<></>}>
            <NavBar />
            <SideBar />
            <Routes>
              <Route path={PATH.MAIN} element={<MainPage />} />
              <Route path={PATH.AUTH} element={<AuthPage />} />
              <Route path={PATH.POLICY} element={<PrivacyPolicyPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route element={<ProtectRoute />}>
                <Route path={PATH.CATEGORY} element={<CategoryPage />} />
              </Route>
            </Routes>
          </Suspense>
          <SnackBar />
        </ErrorBoundary>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
