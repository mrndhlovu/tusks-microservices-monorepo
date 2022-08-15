import { IPlan } from '../components/profile/billing/BillingPlans';
import { IRequestError } from '../api';
import { isArray, merge, spread, union } from 'lodash';
import { ILabelProps } from '../components/board/canvas/cardActions/CardLabels';
import { LABEL_DEFAULT_OPTIONS } from './constants';
import {
  IChecklist,
  ITaskItem,
} from '../components/board/canvas/cardActions/AddChecklist';
import { SearchResponse } from 'react-instantsearch-dom';

export const getErrorMessage = (data: IRequestError) => {
  let message: string | string[];
  const isArrayList = isArray(data?.errors);

  if (isArrayList) {
    return (message = data?.errors.map(error => error.message));
  }

  return message || 'Something went wrong';
};

export const isBrowser = typeof window !== 'undefined';

export const checkStringIncludes = (
  string: string,
  values: string[],
): boolean => {
  if (!string) return;
  const stringValuesArray = string.split(' ');
  return values.some(value => stringValuesArray.includes(value));
};

export const getFilteredPlans = <T extends IPlan[]>(plans: T): IPlan[] => {
  const allowedPlans = ['basic', 'gold'];
  const filteredPlans = [];

  plans?.map(plan => {
    if (allowedPlans.includes(plan.metadata.plan)) {
      plan.metadata.plan === 'basic';
      filteredPlans.push(plan);
    }
  });

  return filteredPlans;
};

export const getActivePlans = (
  filteredPlans: IPlan[],
  plan: string,
): IPlan[] => {
  const plans = filteredPlans.filter(option => option.metadata.plan === plan);

  const annualPlan = plans.find(option => option.recurring.interval === 'year');
  const monthlyPlan = plans.find(
    option => option.recurring.interval === 'month',
  );

  return [annualPlan!, monthlyPlan!];
};

export const getPendingPlan = (
  filteredPlans: IPlan[],
  options: { checkedPlan: string; billingMethod: string },
): IPlan => {
  const plan = filteredPlans.find(
    option =>
      option.metadata.plan === options.checkedPlan &&
      option.recurring.interval === options.billingMethod,
  );

  return plan!;
};

export const getPlanDiscount = (
  monthlyPrice: number,
  annualPrice: number,
): string => {
  const normalPrice = (monthlyPrice / 100) * 12;
  const discountPrice = (annualPrice / 100 / 12) * 12;

  const discount = (
    ((normalPrice - discountPrice) * normalPrice) /
    100
  ).toFixed(2);
  return `Save ${discount}%`;
};

export const getLabelOptions = (
  savedLabels: ILabelProps[],
  slice?: boolean,
): ILabelProps[] => {
  if (slice) {
    const labelOptions = [
      ...LABEL_DEFAULT_OPTIONS.slice(0, 6).filter(
        label =>
          label.color !==
          savedLabels.find(item => item.color === label.color)?.color,
      ),
      ...savedLabels,
    ];

    return labelOptions;
  }

  return [
    ...LABEL_DEFAULT_OPTIONS.filter(
      label =>
        label.color !==
        savedLabels.find(item => item.color === label.color)?.color,
    ),
    ...savedLabels,
  ];
};

export const getMergedData = data => {
  if (!data) return;
  const result = [];
  data?.map(arr => result.push(arr?.images));

  return merge(result);
};

export const calculateMinutes = (milli: number) => {
  if (!milli) return '--:--';
  const seconds = Math.floor((milli / 1000) % 60);
  const minutes = Math.floor((milli / (60 * 1000)) % 60);

  return (
    (minutes < 10 ? `0${minutes}` : minutes) +
    ':' +
    (seconds < 10 ? `0${seconds}` : seconds)
  );
};

export const getPercentage = (progress: number, duration_ms: number) => {
  if (!progress) return 0;
  return ((progress / 60000) * 100) / (duration_ms / 60000);
};

export const calculateCompleteState = (
  tasks: ITaskItem[],
  checklistId: string,
): number => {
  if (tasks.length === 0) return 0;
  const tasksTotal = tasks.length;
  const complete = tasks.filter(
    task => task.state === 'complete' && checklistId === task.checklist,
  ).length;

  const percentage = (complete * 100) / tasksTotal;

  return +percentage.toFixed(0);
};

export const calculateCompletedTasks = (tasks: ITaskItem[]): number[] => {
  let completedTasks = 0;

  tasks.map(task => {
    if (task.state === 'complete') {
      completedTasks++;
    }
  });

  return [tasks.length, completedTasks];
};

export const mergeTasks = (checklists: IChecklist[]): ITaskItem[] => {
  const result = [];
  checklists?.reduce((a, b) => b.tasks.map((c, i) => result.push(c)), []);

  return result;
};

export const getSortedSearch = (data: SearchResponse) => {
  const cards = [];
  const workspaces = [];
  const boards = [];

  data?.map(item => {
    if (item.type === 'card') {
      cards.push(item);
    }

    if (item.type === 'board') {
      boards.push(item);
    }

    if (item.type === 'workspace') {
      workspaces.push(item);
    }
  });

  return { cards, boards, workspaces };
};

export const resetForm = (id: string) => {
  const form = document.getElementById(id) as HTMLFormElement;

  console.log(form);

  if (form) {
    form.reset();
  }
};
