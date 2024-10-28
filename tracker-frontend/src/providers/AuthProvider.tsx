import { ReactNode } from "react";
import { useGetProfile } from "@/hooks/api-hooks/useAuthQuery";
import { Navigate } from "react-router-dom";
import { Loader2Icon } from "lucide-react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: userData, isLoading } = useGetProfile()

  if (isLoading){
    return <div className="h-svh flex justify-center items-center">
    <div className="flex flex-col items-center">
      <div className="text-gray-500">May take some time</div>
      <Loader2Icon className=" animate-spin " />
    </div>
  </div>
  }

  if (!userData){
    return <Navigate to="/signin" replace  />
  }

  return (
    <div>
      {children}
    </div>
  );
};

export default AuthProvider;
