import { FormStep, FormData } from './types/form';
import EmailForm from './components/EmailForm';
import IntroForm from './components/IntroForm';
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

export const formConfig: FormStep[] = [
  {
    id: 'email',
    component: EmailForm,
    title: 'E-mail',
    nextStepLogic: () => 'intro'
  },
  {
    id: 'intro',
    component: IntroForm,
    title: 'Introdução',
    nextStepLogic: () => 'birthDate',
    prevStepId: 'email'
  },
  {
    id: 'birthDate',
    component: BirthDateForm,
    title: 'Data de Nascimento',
    nextStepLogic: () => 'maritalStatus',
    prevStepId: 'intro'
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
    nextStepLogic: () => 'expenseControl',
    prevStepId: 'passiveIncome'
  },
  {
    id: 'expenseControl',
    component: ExpenseControlForm,
    title: 'Controle de Gastos',
    nextStepLogic: () => 'monthlyExpenses',
    prevStepId: 'otherIncome'
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
    nextStepLogic: () => 'debts',
    prevStepId: 'surplusAction'
  },
  {
    id: 'debts',
    component: DebtsForm,
    title: 'Dívidas',
    nextStepLogic: () => 'patrimony',
    prevStepId: 'deficitAction'
  },
  {
    id: 'patrimony',
    component: PatrimonyEmergencyFundForm,
    title: 'Reserva de emergência',
    nextStepLogic: () => 'goals',
    prevStepId: 'debts'
  },
  ,
  {
    id: 'patrimony',
    component: PatrimonyInvestmentsForm,
    title: 'Investimentos ativos',
    nextStepLogic: () => 'goals',
    prevStepId: 'debts'
  },
  ,
  {
    id: 'patrimony',
    component: PatrimonyRetirementForm,
    title: 'Reserva de emergência',
    nextStepLogic: () => 'goals',
    prevStepId: 'debts'
  },
  ,
  {
    id: 'patrimony',
    component: PatrimonyAssetsForm,
    title: 'Reserva de emergência',
    nextStepLogic: () => 'goals',
    prevStepId: 'debts'
  },
  {
    id: 'goals',
    component: GoalsSection6Form,
    title: 'Objetivos e Prioridades',
    nextStepLogic: () => 'expectations',
    prevStepId: 'patrimony'
  },
  {
    id: 'expectations',
    component: ExpectationsSection7Form,
    title: 'Expectativas e Engajamento',
    nextStepLogic: () => null,
    prevStepId: 'goals'
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
