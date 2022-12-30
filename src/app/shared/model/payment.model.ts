export interface IPayment {
  trip?: string;
  vehicle?: string;
  company?: string;
  seat?: string[];
  amountPaid?: number;
  paymentInfo?: {
    id?: string;
    status?: string;
    update_time?: string;
    email_address?: string;
  };
}

export class Payment implements IPayment {
  constructor(
    public trip?: string,
    public vehicle?: string,
    public company?: string,
    public seat?: string[],
    public amountPaid?: number,
    public paymentInfo?: {
      id?: string;
      status?: string;
      update_time?: string;
      email_address?: string;
    }
  ) {}
}
