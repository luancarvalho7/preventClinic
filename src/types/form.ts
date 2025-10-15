export interface FormData {
  birthDate?: string;
  maritalStatus?: string;
  hasDependents?: string;
  dependentsCount?: string;
  livingWith?: string;
  currentProfession?: string;
  mainIncomeSource?: string;
  workRegime?: string;
  hasSecondaryIncome?: string;
  secondaryIncomeSource?: string;
  secondaryWorkRegime?: string;
  grossIncome?: string;
  netIncome?: string;
  incomeVariability?: string;
  incomeVariabilityDetails?: string;
  hasPassiveIncome?: string;
  otherIncome?: string;
  hasExpenseControl?: string;
  monthlyExpenses?: string;
  surplusAction?: string;
  deficitAction?: string;
  hasDebts?: string;
  debtTypes?: string[];
  totalDebtAmount?: string;
  averageInterestRate?: string;
  hasOverdueDebts?: string;
  triedRenegotiation?: string;
  hasEmergencyFund?: string;
  emergencyFundMonths?: string;
  emergencyFundLocation?: string;
  alreadyInvests?: string;
  investmentTypes?: string;
  monthlyInvestment?: string;
  investmentGoal?: string;
  retirementIncome?: string;
  hasVehicle?: string;
  vehicleDetails?: string;
  hasProperty?: string;
  propertyDetails?: string;
  otherAssets?: string;
  goals12Months?: string;
  goals5Years?: string;
  topPriority?: string;
  goalImpact?: string;
  changeCommitment?: string;
  consultingGoals?: string[];
  successDefinition?: string;
  [key: string]: any;
}

export interface FormStep {
  id: string;
  component: React.ComponentType<FormStepProps>;
  nextStepLogic: (formData: FormData) => string | null;
  prevStepId?: string | ((formData: FormData, history: string[]) => string | null);
  title?: string;
  questionNumber?: number;
}

export interface FormStepProps {
  onContinue: (data: any) => void;
  formData?: FormData;
  questionNumber?: number;
}
