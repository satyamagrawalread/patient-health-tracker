import { BEARER } from "@/constant";
import { getToken } from "@/helpers";
import { axiosInstance } from "@/lib/axios";

export const getPatients = async ({
  filters,
  searchQuery,
}: {
  filters: string[];
  searchQuery: string;
}) => {
  let url = "/patients";
  const token = getToken();
  if (searchQuery.length > 0) {
    url = `${url}?searchQuery=${searchQuery}`;
    if(filters.length > 0)
    url = `${url}&filters=${filters.join(",")}`;
  }

  const response = await axiosInstance.get(url, {
    headers: { Authorization: `${BEARER} ${token}` },
  });
  return response.data;
};

export const getPatientById = async ({ id }: { id: string }) => {
  let url = `/patient/${id}`;
  const token = getToken();
  const response = await axiosInstance.get(url, {
    headers: { Authorization: `${BEARER} ${token}` },
  });
  return response.data;
};
