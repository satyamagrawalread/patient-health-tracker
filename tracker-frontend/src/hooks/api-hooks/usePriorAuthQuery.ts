import { PriorAuthOutputType } from './../../types/priorAuth.types';
import { CreatePriorAuthRequest, getAllPriorAuthRequestsData, getAPriorAuthRequestData } from '@/api-functions/priorAuth.api';
import { message } from 'antd';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const useGetAPriorAuthRequestData = ({requestId}: {requestId: string}) => {
    return useQuery<{data: PriorAuthOutputType}>({
        queryKey: ['priorAuth', requestId],
        queryFn: () => getAPriorAuthRequestData({requestId})
    })
}
export const useGetAllPriorAuthRequestsData = () => {
    return useQuery<{data: PriorAuthOutputType[]}>({
        queryKey: ['priorAuth'],
        queryFn: getAllPriorAuthRequestsData
    })
}

export const usePostMutationCreatePriorAuthRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: CreatePriorAuthRequest,
        onSuccess: (_data, variables) => {
            message.success("Request Created Successfully");
            queryClient.invalidateQueries({ queryKey: ["patient", variables.patientId]});
            queryClient.invalidateQueries({queryKey: ['priorAuth']});
        }
    })
}