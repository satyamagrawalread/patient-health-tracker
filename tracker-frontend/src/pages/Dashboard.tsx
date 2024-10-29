import PatientsList from "@/components/dashboard/PatientsList";
import PriorAuthRequests from "@/components/dashboard/PriorAuthRequests";
import Layout from "@/components/Layout";
import { useLocation } from "react-router-dom";

export const Dashboard = () => {
  const {pathname} = useLocation();
  
  return (
    <Layout>
      {pathname=='/requests' ? <PriorAuthRequests /> : <PatientsList />}
    </Layout>
  );
};
