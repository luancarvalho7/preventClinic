import { FormStep, FormData } from './types/form';
import StartForm from './components/StartForm';
import ConsultorForm from './components/ConsultorForm';
import ContactInfoForm from './components/ContactInfoForm';
import BirthDateForm from './components/BirthDateForm';
import MaritalStatusForm from './components/MaritalStatusForm';
import DependentsForm from './components/DependentsForm';
import LivingWithForm from './components/LivingWithForm';
import ProfessionForm from './components/ProfessionForm';
import MainIncomeForm from './components/MainIncomeForm';
import WorkRegimeForm from './components/WorkRegimeForm';
import SecondaryIncomeForm from './components/SecondaryIncomeForm';
import IncomeAmountsForm from './components/IncomeAmountsForm';
import IncomeVariabilityForm from './components/IncomeVariabilityForm';
import PassiveIncomeForm from './components/PassiveIncomeForm';
import OtherIncomeForm from './components/OtherIncomeForm';
import ExpenseControlForm from './components/ExpenseControlForm';
import MonthlyExpensesForm from './components/MonthlyExpensesForm';
import SurplusActionForm from './components/SurplusActionForm';
import DeficitActionForm from './components/DeficitActionForm';
import DebtsForm from './components/DebtsForm';
import PatrimonySection5Form from './components/PatrimonySection5Form';
import GoalsSection6Form from './components/GoalsSection6Form';
import ExpectationsSection7Form from './components/ExpectationsSection7Form';
import PatrimonyEmergencyFundForm from './components/PatrimonyEmergencyFundForm';
import PatrimonyInvestmentsForm from './components/PatrimonyInvestmentsForm';
import PatrimonyRetirementForm from './components/PatrimonyRetirementForm';
import PatrimonyAssetsForm from './components/PatrimonyAssetsForm';


export const formConfig: FormStep[] = [
  {
    id: 'start',
    component: StartForm,
    title: 'Início',
    nextStepLogic: () => 'consultor'
  },
  {
    id: 'consultor',
    component: ConsultorForm,
    title: 'Consultor',
    nextStepLogic: () => 'contactInfo',
    prevStepId: 'start'
  },
  {
    id: 'contactInfo',
    component: ContactInfoForm,
    title: 'Informações de Contato',
    nextStepLogic: () => 'birthDate',
    prevStepId: 'consultor'
  },
  {
    id: 'birthDate',
    component: BirthDateForm,
    title: 'Data de Nascimento',
    nextStepLogic: () => 'maritalStatus',
    prevStepId: 'contactInfo'
  },
  {
    id: 'maritalStatus',
    component: MaritalStatusForm,
    title: 'Estado Civil',
    nextStepLogic: () => 'dependents',
    prevStepId: 'birthDate'
  },
  {
    id: 'dependents',
    component: DependentsForm,
    title: 'Dependentes',
    nextStepLogic: () => 'livingWith',
    prevStepId: 'maritalStatus'
  },
  {
    id: 'livingWith',
    component: LivingWithForm,
    title: 'Com Quem Vive',
    nextStepLogic: () => 'profession',
    prevStepId: 'dependents'
  },
  {
    id: 'profession',
    component: ProfessionForm,
    title: 'Profissão',
    nextStepLogic: () => 'mainIncome',
    prevStepId: 'livingWith'
  },
  {
    id: 'mainIncome',
    component: MainIncomeForm,
    title: 'Fonte de Renda Principal',
    nextStepLogic: () => 'secondaryIncome',
    prevStepId: 'profession'
  },
  /*
  {
    id: 'workRegime',
    component: WorkRegimeForm,
    title: 'Regime de Trabalho',
    nextStepLogic: () => 'secondaryIncome',
    prevStepId: 'mainIncome'
  }, */
  {
    id: 'secondaryIncome',
    component: SecondaryIncomeForm,
    title: 'Renda Secundária',
    nextStepLogic: () => 'incomeVariability',
    prevStepId: 'mainIncome'
  },/*
  {
    id: 'incomeAmounts',
    component: IncomeAmountsForm,
    title: 'Valores de Renda',
    nextStepLogic: () => 'incomeVariability',
    prevStepId: 'secondaryIncome'
  },*/
  {
    id: 'incomeVariability',
    component: IncomeVariabilityForm,
    title: 'Variabilidade de Renda',
    nextStepLogic: () => 'passiveIncome',
    prevStepId: 'secondaryIncome'
  },
  {
    id: 'passiveIncome',
    component: PassiveIncomeForm,
    title: 'Renda Passiva',
    nextStepLogic: () => 'otherIncome',
    prevStepId: 'incomeVariability'
  },
  {
    id: 'otherIncome',
    component: OtherIncomeForm,
    title: 'Outras Rendas',
    nextStepLogic: () => 'debts',
    prevStepId: 'passiveIncome'
  },
  {
    id: 'debts',
    component: DebtsForm,
    title: 'Dívidas',
    nextStepLogic: () => 'patrimonyEmergencyFund',
    prevStepId: 'otherIncome'
  },
  {
  id: 'patrimonyEmergencyFund',
  component: PatrimonyEmergencyFundForm,
  title: 'Reserva de emergência',
  nextStepLogic: () => 'patrimonyInvestments',
  prevStepId: 'debts'
},
{
  id: 'patrimonyInvestments',
  component: PatrimonyInvestmentsForm,
  title: 'Investimentos ativos',
  nextStepLogic: () => 'patrimonyRetirement',
  prevStepId: 'patrimonyEmergencyFund'
},
{
  id: 'patrimonyRetirement',
  component: PatrimonyRetirementForm,
  title: 'Aposentadoria desejada',
  nextStepLogic: () => 'patrimonyAssets',
  prevStepId: 'patrimonyInvestments'
},
{
  id: 'patrimonyAssets',
  component: PatrimonyAssetsForm,
  title: 'Veículos, imóveis e bens',
  nextStepLogic: () => 'goals',
  prevStepId: 'patrimonyRetirement'
},
  {
    id: 'goals',
    component: GoalsSection6Form,
    title: 'Objetivos e Prioridades',
    nextStepLogic: () => 'expenseControl',
    prevStepId: 'patrimonyAssets'
  },
  {
    id: 'expenseControl',
    component: ExpenseControlForm,
    title: 'Controle de Gastos',
    nextStepLogic: () => 'monthlyExpenses',
    prevStepId: 'goals'
  },
  {
    id: 'monthlyExpenses',
    component: MonthlyExpensesForm,
    title: 'Gastos Mensais',
    nextStepLogic: () => 'surplusAction',
    prevStepId: 'expenseControl'
  },
  {
    id: 'surplusAction',
    component: SurplusActionForm,
    title: 'Ação com Sobras',
    nextStepLogic: () => 'deficitAction',
    prevStepId: 'monthlyExpenses'
  },
  {
    id: 'deficitAction',
    component: DeficitActionForm,
    title: 'Ação com Faltas',
    nextStepLogic: () => 'expectations',
    prevStepId: 'surplusAction'
  },
  {
    id: 'expectations',
    component: ExpectationsSection7Form,
    title: 'Expectativas e Engajamento',
    nextStepLogic: () => null,
    prevStepId: 'deficitAction'
  }
];

export const findStepById = (id: string): FormStep | undefined => {
  return formConfig.find(step => step.id === id);
};

export const findStepIndexById = (id: string): number => {
  return formConfig.findIndex(step => step.id === id);
};

export const getFirstStep = (): FormStep => {
  return formConfig[0];
};
