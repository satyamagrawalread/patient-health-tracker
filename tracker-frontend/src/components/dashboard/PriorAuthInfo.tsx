import { useGetAPriorAuthRequestData } from "@/hooks/api-hooks/usePriorAuthQuery";
import { Calendar, FileText } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

export default function PriorAuthInfo({ requestId }: { requestId: string }) {
  const { data: requestData, isLoading } = useGetAPriorAuthRequestData({
    requestId: requestId,
  });
  const request = useMemo(() => {
    return requestData?.data;
  }, [requestData]);
  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 sm:w-[250px] w-[180px]" />
          <Skeleton className="h-4 xs:w-[200px] w-[130px]" />
        </div>
      </div>
    );
  }
  
  return (
    <div key={requestId} className="border rounded-lg p-4 hover:bg-gray-50">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Service Date: {request?.dateOfService}
          </h4>
          <Badge
            className={
              request?.status === "Approved"
                ? "bg-green-500"
                : request?.status === "Pending"
                ? "bg-yellow-500"
                : "bg-red-500"
            }
          >
            {request?.status}
          </Badge>
        </div>
        <div className="text-right text-sm text-gray-600">
          <p>ICD: {request?.diagnosisCode}</p>
          <p>{request?.insurancePlan.provider}</p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Treatment:</span>{" "}
          {request?.treatmentPlan}
        </p>
        {request?.doctorNotes && (
          <div className="mt-2 text-sm flex items-start">
            <FileText className="w-4 h-4 mr-2 mt-0.5" />
            <p className="text-gray-600">{request.doctorNotes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
