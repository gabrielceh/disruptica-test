import { Route, Routes } from 'react-router';
import { LoginPage } from '../presentation/pages';
import { AuthRoutes } from './auth.routes';



export function AuthRouter() {

        
  
  return (
    <Routes>
      <Route path="/" >
        <Route path={AuthRoutes.login} element={<LoginPage/>} />
      </Route>
    </Routes>
  )
}
