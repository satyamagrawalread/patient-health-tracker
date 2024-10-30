import { useGetAllPriorAuthRequestsData } from "@/hooks/api-hooks/usePriorAuthQuery";
import { Calendar, FileText, Loader2Icon } from "lucide-react";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";

export default function PriorAuthRequests() {
  const { data: allRequests, isLoading } = useGetAllPriorAuthRequestsData();
  const requests = useMemo(() => {
    return allRequests?.data || [];
  }, [allRequests]);
  if (isLoading) {
    return <div className="h-svh flex justify-center items-center">
    <div className="flex flex-col items-center">
      <div className="text-gray-500">May take some time</div>
      <Loader2Icon className=" animate-spin " />
    </div>
  </div>;
  }
  return (
    <div className="overflow-y-auto">
      <Card>
        <CardHeader>
          <CardTitle>Prior Authentication Requests Submitted: </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col-reverse gap-2">
          {requests.map((request) => {
            return (
              <div
                key={request._id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
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
          })}
        </CardContent>
      </Card>
    </div>
  );
}
