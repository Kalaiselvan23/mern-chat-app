import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Auth, Chat, Profile } from './pages';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import apiClient from './lib/apiClient';
import { GETUSER_INFO } from './lib/constants';
import { setUserInfo } from './slices/authSlice';
import { toast } from 'sonner';

const PrivateRoute = ({ children }: any) => {
  const userInfo = useSelector((state: any) => state.userInfo.userInfo)
  const isAuthenticated = !userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />
}
const AuthRoute = ({ children }: any) => {
  const userInfo = useSelector((state: any) => state.userInfo.userInfo)
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to={"/chat"} /> : children;
}
function App() {
  const userInfo = useSelector((state: any) => state.userInfo.userInfo);
  const dispatch = useDispatch();
  const getUserInfo = async () => {
    try {
      const res = await apiClient.get(GETUSER_INFO, { withCredentials: true })
      const data = await res.data;
      if(data.err)
      {
        toast("Please login!!")
      }
      dispatch(setUserInfo(data));
    }
    catch (err) {
      console.log(err)
    }
  }
  // useEffect(() => {
  //   if (!userInfo) {
  //     getUserInfo()
  //   }
  // },[getUserInfo])
  return (
    <BrowserRouter>
      <Routes>
        {/* implement auth route, private route */}
        <Route path="/" element={<h1>Home page</h1>} />
        <Route path="/test" element={<h1>Test page</h1>} />
        <Route path="/chat" element={
          // <PrivateRoute>
            <Chat />
          // </PrivateRoute>
        } />
        <Route path="/auth" element={
          // <AuthRoute>
            <Auth />
          // </AuthRoute>
        } />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
