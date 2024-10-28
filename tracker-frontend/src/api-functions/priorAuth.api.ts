import { BEARER } from "@/constant";
import { getToken } from "@/helpers";
import { axiosInstance } from "@/lib/axios";
import { PriorAuthInputType } from "@/types/priorAuth.types";

export const CreatePriorAuthRequest = async ({
  requestData,
  patientId,
}: {
  requestData: PriorAuthInputType;
  patientId: string;
}) => {
  const token = getToken();
  const response = await axiosInstance.post(
    "/request/create",
    {
      ...requestData,
      patientId,
    },
    {
      headers: { Authorization: `${BEARER} ${token}` },
    }
  );
  return response.data;
};

export const getAPriorAuthRequestData = async ({
  requestId,
}: {
  requestId: string;
}) => {
    const token = getToken();
    const url = `/request/${requestId}`;
  const response = await axiosInstance.get(
    url,
    {
      headers: { Authorization: `${BEARER} ${token}` },
    }
  );
  return response.data;
};

export const getAllPriorAuthRequestsData = async() => {
    const token = getToken();
    const url = "/requests";
  const response = await axiosInstance.get(
    url,
    {
      headers: { Authorization: `${BEARER} ${token}` },
    }
  );
  return response.data;
}
