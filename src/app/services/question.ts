import { Aswer } from "./aswer";

export class Question {
  id: number;
  orderby: number;
  question: string;
  question_type: number;
  multiple: boolean;
  next: number;
  aswers: Aswer[];
}
