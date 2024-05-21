import { isInterval, toLocaleDate } from "@/utils";

import type { DistributionContent } from "@/models";

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

export function incrementPercentage(
  content: DistributionContent,
  changeId: string
): DistributionContent {
  return content;
}

export function decrementPercentage(
  content: DistributionContent,
  changeId: string
): DistributionContent {
  return content;
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
