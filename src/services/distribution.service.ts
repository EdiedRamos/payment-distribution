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
  ): DistributionContent | null {
    let distributionIndex = this.db.distributions.findIndex(
      (content) => content.debtId === debtId
    );
    if (distributionIndex === -1) {
      const distribution = {
        id: crypto.randomUUID(),
        debtId,
        content: distributionContent,
      };
      this.db.distributions.push(distribution);
    } else {
      const distribution = this.db.distributions[distributionIndex];
      distribution.content = distributionContent;
    }
    database.save();
    return deepClone(distributionContent);
  }

  getAllDebts(): Debt[] {
    return this.db.debts;
  }

  getDistributionByDebtId(debtId: string): Distribution | undefined {
    return this.db.distributions.find(
      (distribution) => distribution.debtId === debtId
    );
  }

  getDistributionContentByDebtId(
    debtId: string
  ): DistributionContent | undefined {
    return this.getDistributionByDebtId(debtId)?.content;
  }
}

export const distributionService = DistributionService.getInstance();
