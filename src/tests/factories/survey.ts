import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

import { QuestionPick, Survey, SurveyDetail, SurveyQuestion } from 'types/survey';

const buildSurvey = (attrs?: Partial<Survey>): Survey => {
  const coverImageUrl = faker.image.imageUrl(320, 240, undefined, true);

  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    coverImageUrl: coverImageUrl,
    coverImageUrlLarge: `${coverImageUrl}l`,
    createdAt: faker.date.recent().toString(),
    ...attrs,
  };
};

const buildSurveyDetail = (attrs?: Partial<SurveyDetail>): SurveyDetail => {
  return {
    survey: buildSurvey(),
    intro: buildSurveyQuestionIntro(),
    questions: [],
    outro: buildSurveyQuestionOutro(),
    ...attrs,
  };
};

const buildSurveyQuestionIntro = (attrs?: Partial<SurveyQuestion>): SurveyQuestion => {
  return buildSurveyQuestion({ pick: 'none', displayType: 'intro', ...attrs });
};

const buildSurveyQuestionOutro = (attrs?: Partial<SurveyQuestion>): SurveyQuestion => {
  return buildSurveyQuestion({ pick: 'none', displayType: 'outro', ...attrs });
};

const buildSurveyQuestion = (attrs?: Partial<SurveyQuestion>): SurveyQuestion => {
  const coverImageUrl = faker.image.imageUrl(320, 240, undefined, true);

  return {
    id: faker.datatype.uuid(),
    text: faker.lorem.paragraph(),
    shortText: faker.lorem.sentence(),
    pick: sample(['none', 'one', 'any']) as QuestionPick,
    displayOrder: 0,
    displayType: 'star',
    isMandatory: false,
    coverImageUrl: coverImageUrl,
    coverImageUrlLarge: `${coverImageUrl}l`,
    coverImageOpacity: 0.5,
    ...attrs,
  };
};

export { buildSurvey, buildSurveyDetail, buildSurveyQuestion, buildSurveyQuestionIntro, buildSurveyQuestionOutro };
