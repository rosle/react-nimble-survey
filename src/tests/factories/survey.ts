import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

import { QuestionPick, Survey, SurveyQuestion } from 'types/survey';

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

const buildSurveyQuestionIntro = (attrs?: Partial<SurveyQuestion>): SurveyQuestion => {
  return buildSurveyQuestion({ pick: 'none', displayType: 'intro', ...attrs });
};

const buildSurveyQuestion = (attrs?: Partial<SurveyQuestion>): SurveyQuestion => {
  return {
    id: faker.datatype.uuid(),
    text: faker.lorem.paragraph(),
    shortText: faker.lorem.sentence(),
    pick: sample(['none', 'one', 'any']) as QuestionPick,
    displayOrder: 0,
    displayType: 'intro',
    isMandatory: false,
    imageUrl: faker.image.imageUrl(),
    coverImageUrl: faker.image.imageUrl(),
    coverImageOpacity: 0.5,
    ...attrs,
  };
};

export { buildSurvey, buildSurveyQuestion, buildSurveyQuestionIntro };
