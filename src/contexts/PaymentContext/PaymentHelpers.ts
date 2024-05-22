import type { DistributionContent, Payment } from "@/models";
import { isInterval, isPayment, toLocaleDate } from "@/utils";

function getOppositeOperation(value: number): number {
  return value * -1;
}

function canChangePercentage(payment: Payment, change: number): boolean {
  // todo: Validate unpaid status
  if (change > 0) return true;
  return payment.information.percentage >= Math.abs(change);
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
      return {
        ...leftPayment,
        information: {
          ...leftPayment.information,
          percentage:
            leftPayment.information.percentage +
            getOppositeOperation(increment),
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
      return {
        ...rightPayment,
        information: {
          ...rightPayment.information,
          percentage:
            rightPayment.information.percentage +
            getOppositeOperation(increment),
        },
      };
    }

    if (
      pay.id === changeId &&
      isPayment(pay) &&
      (canChangeLeft || canChangeRight)
    ) {
      return {
        ...pay,
        information: {
          ...pay.information,
          percentage: pay.information.percentage + increment,
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
