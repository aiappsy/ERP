import './style/app.css';

import { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import PageLoader from '@/components/PageLoader';

const AiappsyErpOs = lazy(() => import('./apps/Aiappsy-ERPOs'));
import AIAgentPanel from '@/components/AIAgent/AIAgentPanel';

export default function RoutApp() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<PageLoader />}>
          <AiappsyErpOs />
          <AIAgentPanel />
        </Suspense>
      </Provider>
    </BrowserRouter>
  );
}
