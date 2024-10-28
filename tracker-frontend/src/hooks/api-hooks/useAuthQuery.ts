import { loginUser, registerUser } from "@/api-functions/auth.api";
import { useMutation, useQuery } from "react-query";
import { getToken, removeToken, setToken } from "@/helpers";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { getProfile, handleLogout } from "@/api-functions/user.api";
import { AxiosError } from "axios";
import { IUserFormType } from "@/types/user.types";

export const useGetProfile = () => {
  const token = getToken();
  const navigate = useNavigate();
  return useQuery({
    queryKey: ["profile", token],
    queryFn: () => getProfile(token as string),
    enabled: !!token?.trim(),
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if(data.username) {
        navigate('/', {replace: true});
      }
    }
  });
};

export const usePostMutationLogout = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: handleLogout,
    onSuccess: () => {
      message.success("User is logged out");
      removeToken();
      navigate("/signin", { replace: true });
    }
  })
}

export const usePostMutationRegister = () => {
  const navigate = useNavigate();
  return useMutation<
    {
      token: string;
    },
    AxiosError<{
      message: string;
    }>,
    IUserFormType
  >({
    mutationFn: registerUser,
    onSuccess: (data, variables) => {
      setToken(data.token);
      message.success(`Welcome to your dashboard: ${variables.username}!`);
      navigate("/", { replace: true });
    },
    onError(error) {
      message.error(error?.response?.data?.message || "Unable to register");
    },
  });
};

export const usePostMutationLogin = () => {
  const navigate = useNavigate();

  return useMutation<
    {
      token: string;
    },
    AxiosError<{
      message: string;
    }>,
    IUserFormType
  >({
    mutationFn: loginUser,
    onSuccess: (data, variables) => {
      setToken(data.token);
      message.success(`Welcome Back: ${variables.username}!`);
      navigate("/", { replace: true });
    },
    onError(error) {
      message.error(error?.response?.data?.message || "Unable to login");
    },
  });
};
