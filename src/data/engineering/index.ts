import { YearData } from "./cse-aiml";
import { cseAIMLData } from "./cse-aiml";
import { cseData } from "./cse";
import { eceData } from "./ece";
import { eeeData } from "./eee";
import { civilData } from "./civil";
import { mechanicalData } from "./mechanical";

export const engineeringData: Record<string, YearData[]> = {
  'cse-aiml': cseAIMLData,
  'cse': cseData,
  'ece': eceData,
  'eee': eeeData,
  'civil': civilData,
  'mechanical': mechanicalData,
};

export { cseAIMLData, cseData, eceData, eeeData, civilData, mechanicalData };
export type { YearData } from "./cse-aiml";
