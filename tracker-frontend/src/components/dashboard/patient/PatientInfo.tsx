import { useGetPatientDataQuery } from "@/hooks/api-hooks/usePatientsQuery";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TextHighlight from "@/components/TextHighlight";
import { Loader2Icon } from "lucide-react";
import CreatePriorAuthRequestModal from "../CreatePriorAuthRequestModal";
import PriorAuthInfo from "../PriorAuthInfo";
import { useParams } from "react-router-dom";

export default function PatientInfo({
  searchQuery,
}: {
  searchQuery: string;
}) {
  const { patientId } = useParams();
  const { data: patientData, isLoading } = useGetPatientDataQuery({
    id: patientId || '',
  });

  const patient = useMemo(() => {
    return patientData?.data;
  }, [patientData]);

  if (isLoading) {
    return <Loader2Icon className=" animate-spin w-full text-center mt-20" />;
  }
  return (
    <div className="max-w-4xl mx-auto md:p-4 space-y-4">
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>Patient Information</CardTitle>
          {patient && <CreatePriorAuthRequestModal patient={patient} />}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg">{patient?.name}</h3>
              <p className="text-gray-600">
                <TextHighlight
                  searchText={searchQuery}
                  text={`${patient?.age} years old • ${patient?.gender}`}
                />
              </p>
              <div className="mt-2">
                <Badge className="bg-blue-500">
                  <TextHighlight
                    searchText={searchQuery}
                    text={`${patient?.condition}`}
                  />
                </Badge>
                <Badge className="ml-2 bg-gray-500">
                  <TextHighlight
                    searchText={searchQuery}
                    text={`ICD: ${patient?.diagnosisCode}`}
                  />
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="font-medium">Insurance Details</h4>
              <p className="text-sm text-gray-600">
                <TextHighlight
                  searchText={searchQuery}
                  text={`${patient?.insurancePlan.provider}`}
                />
              </p>
              <p className="text-sm text-gray-600">
                <TextHighlight
                  searchText={searchQuery}
                  text={`Policy: ${patient?.insurancePlan.policyNumber}`}
                />
              </p>
              <p className="text-sm text-gray-600">
                <TextHighlight
                  searchText={searchQuery}
                  text={`Group: ${patient?.insurancePlan.groupNumber}`}
                />
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Current Treatment Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            <TextHighlight
              searchText={searchQuery}
              text={`${patient?.treatmentPlan}`}
            />
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Medical History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patient?.medicalHistory.map((record, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">
                      <TextHighlight
                        searchText={searchQuery}
                        text={`${record.treatment}`}
                      />
                    </h4>
                    <p className="text-sm text-gray-600">
                      <TextHighlight
                        searchText={searchQuery}
                        text={`Date: 
                      ${new Date(record.dateOfService).toLocaleDateString()}`}
                      />
                    </p>
                  </div>
                  <div className="text-right">
                    {Object.keys(record.labResults).map((resultKey) => (
                      <p key={resultKey} className="text-sm">
                        <TextHighlight
                          searchText={searchQuery}
                          text={`${resultKey}: ${record.labResults[resultKey]}`}
                        />
                      </p>
                    ))}
                  </div>
                </div>
                {record.medications.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">
                      <TextHighlight
                        searchText={searchQuery}
                        text={`Medications:`}
                      />
                    </p>
                    <div className="flex gap-2 mt-1">
                      {record.medications.map((med, idx) => (
                        <Badge key={idx} variant="outline">
                          <TextHighlight
                            searchText={searchQuery}
                            text={`${med}`}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Prior Authorization Requests:</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col-reverse gap-2">

          {patient?.priorAuthId && patient?.priorAuthId.length > 0 ? patient?.priorAuthId.map(requestId => {
            return <PriorAuthInfo key={requestId} requestId={requestId} />
          }): (<div>No Prior Authorization Request created</div>)}
        </CardContent>
      </Card>
    </div>
  );
}
