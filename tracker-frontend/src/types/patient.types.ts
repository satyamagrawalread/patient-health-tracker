interface InsuranceDetail {
    provider: string;
    policyNumber: string;
    groupNumber: string;
}

interface LabResults {
    [key: string]: number | string | undefined;
}

interface MedicalDetail {
    treatment: string;
    medications: string[];
    dateOfService: string;
    labResults: LabResults;
}

export interface PatientType {
    _id: string,
    name: string;
    age: number;
    gender: string;
    condition: string;
    diagnosisCode: string;
    insurancePlan: InsuranceDetail;
    medicalHistory: MedicalDetail[] | [];
    treatmentPlan: string;
    priorAuthId: string[] | [];
}
export interface OPatient {
    _id: string,
    name: string,
    age: number,
    gender: string,
    condition: string
}
