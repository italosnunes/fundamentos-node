import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private repository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.repository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Transaction type is invalid!');
    }
    const { total } = this.repository.getBalance();

    if (type === 'outcome' && value > total) {
      throw new Error('You do not have enough balance!');
    }

    const transaction = this.repository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
