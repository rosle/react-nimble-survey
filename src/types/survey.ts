export type Survey = {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  coverImageUrlLarge: string;
  createdAt: string;
};

export type QuestionDisplayType = 'intro';
export type QuestionPick = 'none' | 'one' | 'any';

export type SurveyQuestion = {
  id: string;
  text: string;
  shortText: string;
  pick: QuestionPick;
  displayOrder: number;
  displayType: QuestionDisplayType;
  isMandatory: boolean;
  imageUrl: string;
  coverImageUrl: string;
  coverImageUrlLarge: string;
  coverImageOpacity: number;
};
