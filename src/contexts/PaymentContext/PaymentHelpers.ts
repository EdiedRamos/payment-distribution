// TODO: Refactor this file, some logic can be improved with DRY

import {
  DistributionType,
  PaymentMethod,
  type Debt,
  type DistributionContent,
  type Payment,
} from "@/models";
import {
  generateInterval,
  generateTitle,
  getQuantityFromPercentage,
  isInterval,
  isPayment,
  toLocaleDate,
  toRoundHalf,
} from "@/utils";

function getOppositeOperation(value: number): number {
  return value * -1;
}

function canChangePercentage(payment: Payment, change: number): boolean {
  if (payment.isPaid) return false;
  if (change > 0) return true;
  return (
    payment.information.percentage >= Math.abs(change) &&
    payment.information.percentage > 1
  );
}

function canTakeHalf(payment: Payment): boolean {
  if (payment.isPaid) return false;
  return payment.information.percentage >= 2;
}

function getLeftPayment(
  content: DistributionContent,
  startIndex: number
): Payment | null {
  if (startIndex < 0) return null;
  for (let i = startIndex; i >= 0; i--) {
    const currentContent = content[i];
    if (isPayment(currentContent)) {
      return currentContent;
    }
  }
  return null;
}

function getRightPayment(
  content: DistributionContent,
  startIndex: number
): Payment | null {
  if (startIndex < 0) return null;
  for (let i = startIndex; i < content.length; i++) {
    const currenctContent = content[i];
    if (isPayment(currenctContent)) {
      return currenctContent;
    }
  }
  return null;
}

export function changeTitle(
  content: DistributionContent,
  changeId: string,
  newTitle: string
): DistributionContent {
  return content.map((content) => {
    if (content.id !== changeId || isInterval(content)) return content;
    return {
      ...content,
      information: {
        ...content.information,
        title: newTitle,
      },
    };
  });
}

export function changePercentage(
  debt: Debt,
  content: DistributionContent,
  changeId: string,
  increment: number
): DistributionContent {
  const targetIndex = content.findIndex((pay) => pay.id === changeId);
  const targetContent = content[targetIndex];
  if (
    targetIndex === -1 ||
    isInterval(targetContent) ||
    !canChangePercentage(targetContent, increment)
  ) {
    return content;
  }
  const leftPayment = getLeftPayment(content, targetIndex - 1);
  const rightPayment = getRightPayment(content, targetIndex + 1);
  if (!leftPayment && !rightPayment) return content;
  let canChangeLeft = false;
  let canChangeRight = false;
  let wasChanged = false;
  if (leftPayment) {
    canChangeLeft = canChangePercentage(
      leftPayment,
      getOppositeOperation(increment)
    );
  }
  if (rightPayment) {
    canChangeRight = canChangePercentage(
      rightPayment,
      getOppositeOperation(increment)
    );
  }
  return content.map((pay) => {
    if (
      leftPayment &&
      canChangeLeft &&
      leftPayment.id === pay.id &&
      !wasChanged
    ) {
      wasChanged = true;
      const percentage =
        leftPayment.information.percentage + getOppositeOperation(increment);
      return {
        ...leftPayment,
        information: {
          ...leftPayment.information,
          quantity: getQuantityFromPercentage(debt.quantity, percentage),
          percentage,
        },
      };
    }

    if (
      rightPayment &&
      canChangeRight &&
      rightPayment.id === pay.id &&
      !wasChanged
    ) {
      wasChanged = true;
      const percentage =
        rightPayment.information.percentage + getOppositeOperation(increment);
      return {
        ...rightPayment,
        information: {
          ...rightPayment.information,
          quantity: getQuantityFromPercentage(debt.quantity, percentage),
          percentage,
        },
      };
    }

    if (
      pay.id === changeId &&
      isPayment(pay) &&
      (canChangeLeft || canChangeRight)
    ) {
      const percentage = pay.information.percentage + increment;
      return {
        ...pay,
        information: {
          ...pay.information,
          quantity: getQuantityFromPercentage(debt.quantity, percentage),
          percentage,
        },
      };
    }
    return pay;
  });
}

export function changeEndDate(
  content: DistributionContent,
  changeId: string,
  newDate: string
): DistributionContent {
  return content.map((content) => {
    if (content.id !== changeId || isInterval(content)) return content;
    return {
      ...content,
      information: {
        ...content.information,
        dateToPay: toLocaleDate(newDate),
      },
    };
  });
}

export function addPayment(
  debt: Debt,
  content: DistributionContent,
  intervalId: string
): DistributionContent {
  const intervalIndex = content.findIndex(
    (distribution) => distribution.id === intervalId
  );

  if (intervalIndex === -1 || !isInterval(content[intervalIndex]))
    return content;

  const leftPayment = getLeftPayment(content, intervalIndex);
  const rightPayment = getRightPayment(content, intervalIndex);

  if (!leftPayment && !rightPayment) return content;

  if (leftPayment && canTakeHalf(leftPayment)) {
    const leftPart = content.slice(0, intervalIndex - 1);
    const rightPart = content.slice(intervalIndex + 1);
    const halfPercentage = toRoundHalf(leftPayment.information.percentage);
    return [
      ...leftPart,
      {
        ...leftPayment,
        information: {
          ...leftPayment.information,
          quantity: getQuantityFromPercentage(
            debt.quantity,
            halfPercentage.first
          ),
          percentage: halfPercentage.first,
        },
      },
      content[intervalIndex],
      {
        id: crypto.randomUUID(),
        type: DistributionType.Payment,
        isPaid: false,
        information: {
          currency: debt.currency,
          quantity: getQuantityFromPercentage(
            debt.quantity,
            halfPercentage.second
          ),
          percentage: halfPercentage.second,
          dateToPay: new Date(),
          title: generateTitle(content),
        },
      },
      generateInterval(),
      ...rightPart,
    ];
  }

  if (rightPayment && canTakeHalf(rightPayment)) {
    const leftPart = content.slice(0, intervalIndex + 1);
    const rightPart = content.slice(intervalIndex + 2);
    const halfPercentage = toRoundHalf(rightPayment.information.percentage);
    return [
      ...leftPart,
      {
        id: crypto.randomUUID(),
        type: DistributionType.Payment,
        isPaid: false,
        information: {
          currency: debt.currency,
          quantity: getQuantityFromPercentage(
            debt.quantity,
            halfPercentage.second
          ),
          percentage: halfPercentage.second,
          dateToPay: new Date(),
          title: generateTitle(content),
        },
      },
      generateInterval(),
      {
        ...rightPayment,
        information: {
          ...rightPayment.information,
          quantity: getQuantityFromPercentage(
            debt.quantity,
            halfPercentage.first
          ),
          percentage: halfPercentage.first,
        },
      },
      ...rightPart,
    ];
  }

  return content;
}

export function setPayment(
  content: DistributionContent,
  paymentId: string,
  paymentMethod: PaymentMethod
): DistributionContent {
  return content.map((pay) => {
    if (pay.id !== paymentId || isInterval(pay)) return pay;
    return {
      ...pay,
      isPaid: true,
      transaction: {
        id: crypto.randomUUID(),
        date: new Date(),
        method: paymentMethod,
      },
    };
  });
}
