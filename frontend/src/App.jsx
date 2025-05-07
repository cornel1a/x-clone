import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";

import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";

import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {
  const {data: authUser, isLoading} = useQuery({
    // we use queryKey to give a unique name to our query and refer to it later
    queryKey: ['authUser'],
    queryFn: async() => {
      try{
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        // this to handle when logout it return null for authUser not error
        if(data.error) return null;
        if(!res.ok){
          throw new Error(data.error || "Something went wrong")
        }
        console.log("authUser is here:", data)
        return data;
      } catch(error){
        throw new Error(error)
      }
    },
    // not spinning for long time, only try once
    retry: false
  });

  if(isLoading){
    return(
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size='lg' />
      </div>
    )
  }

  return (
    <div className='flex max-w-6xl mx-auto'>
      {authUser && <Sidebar />} {/* only show sidebar when there's authUser */}
			<Routes>
				<Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
				<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
				<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
				<Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to='/login' />} />
				<Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
			</Routes>
      {authUser && <RightPanel />}
      <Toaster />
		</div>
  );
}

export default App;
