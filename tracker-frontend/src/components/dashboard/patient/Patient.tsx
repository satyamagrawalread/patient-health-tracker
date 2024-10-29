import TextHighlight from "@/components/TextHighlight";
import { cn } from "@/lib/utils";
import { OPatient } from "@/types/patient.types";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Patient({
  patient,
  searchQuery,
}: {
  patient: OPatient;
  searchQuery: string;
}) {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const { pathname } = useLocation();
  const handlePatientClick = () => {
    // useGetPatientDataQuery({id: patient._id});
    sessionStorage.setItem('lastSelectedPatientId', patient._id);
    navigate(`/patient/${patient._id}`, {replace: pathname!=='/'});
  };
  return (
    <div
      onClick={handlePatientClick}
      className={cn(
        "mt-2 ml-2 mr-4 p-2 rounded-lg transition-all duration-200 text-gray-800 text-md hover:bg-blue-100 hover:cursor-pointer hover:shadow-sm",
        patientId == patient._id &&
          "bg-blue-50 hover:bg-blue-50 border-2 border-blue-500"
      )}
    >
      <TextHighlight searchText={searchQuery} text={`${patient.name}`} />
      <div className="flex justify-between">
        <div>
          <span className="text-sm text-muted-foreground mr-3"><TextHighlight searchText={searchQuery} text={`${patient.age}`} /></span>
          <span className="text-sm text-muted-foreground"><TextHighlight searchText={searchQuery} text={`${patient.gender}`} /></span>
        </div>
        <span className="w-40 truncate text-right text-muted-foreground">
        <TextHighlight searchText={searchQuery} text={`${patient.condition}`} />
        </span>
      </div>
    </div>
  );
}
