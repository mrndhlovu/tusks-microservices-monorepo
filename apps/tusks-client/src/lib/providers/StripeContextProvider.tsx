import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createContext, ReactNode, useContext } from 'react';

import { apiClient } from '../../api';
import { useAuth, useGlobalState } from '.';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export interface IStripeProduct {
  [key: string]: any;
}

export interface IStripeInvoice {
  periodEnd: string;
  periodStart: string;
  invoiceUrl: string;
  invoiceId: string;
  description: string;
  billingMethod: string;
  amountPaid: number;
  isPaid: boolean;
  invoicePdf: string;
  currency: string;
  [key: string]: any;
}
interface IProps {
  data?: { products: IStripeProduct[]; invoices?: IStripeInvoice[] };
  children: ReactNode;
}

const StripeContextProvider = ({ children, data }: IProps) => {
  const { fetchUser } = useAuth();

  const createSubscription = async (data: ICardDetails) => {
    return new Promise(async (resolve, reject) => {
      await apiClient
        .createCustomerSubscription(data)
        .then(res => {
          fetchUser();
          return resolve(res);
        })
        .catch(() => {});
    });
  };

  return (
    <StripeContext.Provider
      value={{
        createSubscription,
        products: data?.products,
        invoices: data?.invoices,
      }}>
      <Elements stripe={stripePromise}>{children}</Elements>
    </StripeContext.Provider>
  );
};

export interface ICardDetails {
  productId?: string;
  priceId?: string;
  source?: string;
  currency?: 'usd' | 'eur';
  customerId?: string;
  amount?: string;
  paymentMethodId?: string;
  plan?: string;
}

interface IStripeContext {
  createSubscription: (cardData: ICardDetails) => any;
  products?: IStripeProduct[];
  invoices?: IStripeInvoice[];
}

const StripeContext = createContext<IStripeContext>({} as IStripeContext);

export const useStripeContext = () => useContext(StripeContext);

export { StripeContextProvider };
