export interface FormData {
  // Identificação
  birthDate?: string;
  maritalStatus?: string;

  // Família e moradia
  hasDependents?: string;
  dependentsCount?: string;
  livingWith?: string;

  // Profissão e renda principal
  currentProfession?: string;
  mainIncomeSource?: string;
  mainIncomeSourceOther?: string;
  workRegime?: string;

  // Renda secundária
  hasSecondaryIncome?: string;
  secondaryIncomeSource?: string;
  otherSegundaryIncomeSource?: string;
  secondaryIncomeValue?: string;

  // Variabilidade e passivos
  incomeVariability?: string;
  incomeVariabilityDetails?: string;
  hasPassiveIncome?: string;
  passiveIncomeSources?: string[]; // ⚙️ array como no banco
  passiveIncomeValue?: string;
  otherIncome?: string;

  // Controle e despesas
  hasExpenseControl?: string;
  updateFrequency?: string; // ⚙️ adicionado (já existe no banco)
  monthlyExpenses?: string;
  surplusAction?: string;
  deficitAction?: string;

  // Dívidas
  hasDebts?: string;
  debtTypes?: string[];
  totalDebtAmount?: string;
  averageInterestRate?: string;
  hasOverdueDebts?: string;
  triedRenegotiation?: string;

  // Patrimônio e investimentos
  hasEmergencyFund?: string;
  emergencyFundMonths?: string;
  emergencyFundLocation?: string[]; // ⚙️ agora array
  alreadyInvests?: string;
  investmentTypes?: string[]; // ⚙️ agora array
  monthlyInvestment?: string;
  investmentGoal?: string;
  retirementIncome?: string;
  hasVehicle?: string;
  vehicleDetails?: string;
  hasProperty?: string;
  propertyDetails?: string;
  otherAssets?: string;

  // Metas e objetivos
  goals12Months?: string;
  goals5Years?: string;
  topPriority?: string;
  goalImpact?: string;
  changeCommitment?: string;
  consultingGoals?: string[];
  successDefinition?: string;

  // Controle interno
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
