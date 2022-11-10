export type Survey = {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  coverImageUrlLarge: string;
  createdAt: string;

  // Relationships
  questions?: SurveyQuestion[];
};

export type SurveyDetail = {
  survey: Survey;
  intro: SurveyQuestion;
  questions: SurveyQuestion[];
  outro: SurveyQuestion;
};

export type QuestionRatingDisplayType = 'star';
export type QuestionDisplayType = 'intro' | 'outro' | QuestionRatingDisplayType;
export type QuestionPick = 'none' | 'one' | 'any';

export type SurveyQuestion = {
  id: string;
  text: string;
  shortText: string;
  pick: QuestionPick;
  displayOrder: number;
  displayType: QuestionDisplayType;
  isMandatory: boolean;
  coverImageUrl: string;
  coverImageUrlLarge: string;
  coverImageOpacity: number;

  // Relationships
  answers?: SurveyAnswer[];
};

export type SurveyAnswer = {
  id: string;
  text: string;
  displayOrder: number;
  isMandatory: boolean;
};
