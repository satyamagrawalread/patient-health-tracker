import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import { useGetProfile, usePostMutationLogout } from "@/hooks/api-hooks/useAuthQuery";

export default function Navbar() {
  const {pathname} = useLocation();

  const { data: user} = useGetProfile()
  const {mutate: logoutUser } = usePostMutationLogout();

  const handleLogout = () => {
    // queryClient.refetchQueries({
    //   queryKey: ['profile']
    // })
    logoutUser();
  };

  
  return (
    <div className="w-screen flex gap-10 justify-between items-center py-5 px-5 bg-gray-100 border-b shadow-sm">
      <div className="flex-1 flex gap-5 flex-wrap">
      <span className="text-emerald-800 font-semibold">
        Welcome {user.username}
      </span>
      <Link to={pathname=='/requests' ? '/' : '/requests'} replace={true} className="text-blue-600 text-md font-semibold hover:bg-blue-50 px-2 rounded-lg border-2 border-gray-300">{pathname=='/requests' ? 'Patients' : 'Requests'}</Link>
      </div>
      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
