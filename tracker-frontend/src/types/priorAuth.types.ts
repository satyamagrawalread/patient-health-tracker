interface InsuranceDetail {
  provider: string;
  policyNumber: string;
  groupNumber: string;
}
export interface PriorAuthInputType {
  patientName: string;
  condition: string;
  treatmentPlan: string;
  diagnosisCode: string;
  insurancePlan: InsuranceDetail;
  dateOfService: String;
  doctorNotes: string;
}

export interface PriorAuthOutputType {
  _id: string;
  patientName: string;
  condition: string;
  treatmentPlan: string;
  diagnosisCode: string;
  insurancePlan: InsuranceDetail;
  dateOfService: String;
  doctorNotes: string;
  status: string;
}
