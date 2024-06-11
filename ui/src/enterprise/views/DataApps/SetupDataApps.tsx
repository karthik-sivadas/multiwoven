import { Navigate, Route, Routes } from 'react-router-dom';
import DataApps from '.';
import AppDetails from './AppDetails';

const SetupDataApps = (): JSX.Element => {
  return (
    <Routes>
      <Route path='list'>
        <Route index element={<DataApps />} />
        <Route path=':dataApp' element={<AppDetails />} />
      </Route>
      <Route path='*' element={<Navigate to='list' />} />
    </Routes>
  );
};

export default SetupDataApps;
