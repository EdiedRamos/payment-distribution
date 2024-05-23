import type {
  DatabaseContent,
  Debt,
  Distribution,
  DistributionContent,
} from "@/models";

import { database } from "@/services";
import { deepClone } from "@/utils";

class DistributionService {
  private static instance: DistributionService;

  private db: DatabaseContent;

  private constructor() {
    this.db = database.getDatabase();

    if (!this.db.distributions) {
      this.db.distributions = [];
    }
  }

  static getInstance(): DistributionService {
    if (!DistributionService.instance) {
      DistributionService.instance = new DistributionService();
    }
    return DistributionService.instance;
  }

  addDistribution(debtId: string): Distribution {
    const newDistribution: Distribution = {
      id: crypto.randomUUID(),
      debtId,
      content: [],
    };
    this.db.distributions.push(newDistribution);
    database.save();
    return deepClone(newDistribution);
  }

  updateDistributionContent(
    debtId: string,
    distributionContent: DistributionContent
  ) {
    const distribution = this.getDistributionByDebtId(debtId);
    if (!distribution) return;
    distribution.content = distributionContent;
    database.save();
  }

  getAllDebts(): Debt[] {
    return deepClone(this.db.debts);
  }

  getDistributionByDebtId(debtId: string): Distribution | undefined {
    return this.db.distributions.find(
      (distribution) => distribution.debtId === debtId
    );
  }
}

export const distributionService = DistributionService.getInstance();
