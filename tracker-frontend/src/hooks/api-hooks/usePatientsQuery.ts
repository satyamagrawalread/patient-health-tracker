import { getPatientById, getPatients } from "@/api-functions/patients.api";
import { OPatient, PatientType } from "@/types/patient.types";
import { message } from "antd";
import { useQuery } from "react-query";


export const useGetAllPatientsQuery = ({
  filters,
  searchQuery,
}: {
  filters: string[];
  searchQuery: string;
}) => {
  // const navigate = useNavigate();
  // const { pathname } = useLocation();
  return useQuery<{ data: OPatient[] }>({
    queryKey: ["patients", ...filters, searchQuery],
    queryFn: () => getPatients({ filters, searchQuery }),
    onSuccess: () => {
      const lastSelectedPatientId = sessionStorage.getItem(
        "lastSelectedPatientId"
      );
      if (lastSelectedPatientId) {
        // console.log(window.history);
        // navigate(`/patient/${lastSelectedPatientId}`);
      }
    },
  });
};

export const useGetPatientDataQuery = ({ id }: { id: string }) => {
  return useQuery<{ data: PatientType }>({
    queryKey: ["patient", id],
    queryFn: () => getPatientById({ id }),
    onError: () => {
      message.warning("Couldn't fetch data. Try Again");
    },
    enabled: !!id.trim(),
  });
};
