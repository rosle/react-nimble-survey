export type Survey = {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  coverImageUrlLarge: string;
  createdAt: string;
};

export type DisplayType = 'intro';
export type Pick = 'none' | 'one' | 'any';

export type SurveyQuestion = {
  id: string;
  text: string;
  shortText: string;
  pick: Pick;
  displayOrder: number;
  displayType: DisplayType;
  isMandatory: boolean;
  imageUrl: string;
  coverImageUrl: string;
  coverImageOpacity: number;
};
