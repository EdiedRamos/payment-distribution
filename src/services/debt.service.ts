import type { DatabaseContent, Debt } from "@/models";

import { database } from "@/services";
import { deepClone } from "@/utils";

class DebtService {
  private static instance: DebtService;

  private db: DatabaseContent;

  private constructor() {
    this.db = database.getDatabase();

    if (!this.db.debts) {
      this.db.debts = [];
    }
  }

  static getInstance(): DebtService {
    if (!DebtService.instance) {
      DebtService.instance = new DebtService();
    }
    return DebtService.instance;
  }

  addDebt(debt: Debt): Debt {
    this.db.debts.push(debt);
    database.save();
    return deepClone(debt);
  }

  updatePayment(debtId: string, quantity: number): Debt | null {
    const debt = this.getDebtById(debtId);
    if (!debt) return null;
    debt.paid = quantity;
    if (debt.paid === debt.quantity) {
      debt.isPaid = true;
    }
    database.save();
    return debt;
  }

  getAllDebts(): Debt[] {
    return deepClone(this.db.debts);
  }

  getDebtById(debtId: string): Debt | undefined {
    return this.db.debts.find((debt) => debt.id === debtId);
  }
}

export const debtService = DebtService.getInstance();
