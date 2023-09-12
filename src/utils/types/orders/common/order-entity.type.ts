export type OrderEntity<
  T extends Record<string, unknown> = Record<string, unknown>
> = {
  itemId: string;
  itemDetails: T;
  status: string;
  customerId?: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    paymentAcknowledgement: boolean;
    termsAndConditions: boolean;
  };
  paymentId?: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
};
