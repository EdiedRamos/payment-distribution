import type { DistributionContent } from "@/models";
import { isInterval } from "@/utils";

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
