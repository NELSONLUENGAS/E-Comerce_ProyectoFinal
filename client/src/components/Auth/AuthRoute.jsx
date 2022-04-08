import { Navigate, Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';

function AuthRoute(){
    const isLogin = useSelector(state => state.Auth.isLogin);
    const isAdmin = useSelector(state => state.Auth.isAdmin);
    const role = useSelector(state => state.Auth.role);


    if(role === 'user') {
        if(isLogin) {
            return <Outlet />
        } else {
            return <Navigate to="/SignIn" replace />
            //
        }
    }
    if(role === 'admin') {
        if(isLogin && isAdmin) {
            return <Outlet />
        } else {
            return <Navigate to="/" replace />
        }
    }
}
export default AuthRoute;