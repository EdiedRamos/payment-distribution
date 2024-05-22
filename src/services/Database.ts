import { Currency, type DatabaseContent } from "@/models";

import { currencyInfo } from "@/constants";

class DataBase {
  static instance: DataBase;

  private database: DatabaseContent;

  private constructor() {
    try {
      const parse = JSON.parse(localStorage.getItem("database") || "");
      this.database = parse;
    } catch {
      this.database = {
        debts: [
          {
            id: crypto.randomUUID(),
            currency: currencyInfo[Currency.USD],
            quantity: 182,
            paid: 0,
            isPaid: false,
          },
        ],
        distributions: [],
      };
    }
  }

  static getInstance(): DataBase {
    if (!DataBase.instance) {
      DataBase.instance = new DataBase();
    }
    return DataBase.instance;
  }

  getDatabase(): DatabaseContent {
    return this.database;
  }

  save(): boolean {
    try {
      const stringify = JSON.stringify(database.database);
      localStorage.setItem("database", stringify);
      return true;
    } catch {
      return false;
    }
  }
}

export const database = DataBase.getInstance();
