export interface TransactionModel {
  tableName: 'transaction_table';
  sender_id: number;
  receive_id: number;
  receive_phoneNumber: number;
  typeof: string;
  amount: number;
  user_name: string;
  date: string;
  time: string;
  current_bal: number;
}
