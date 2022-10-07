import Serializer from './serializer';

const surveyResponse = {
  data: [
    {
      id: 'd5de6a8f8f5f1cfe51bc',
      type: 'survey',
      attributes: {
        title: 'Scarlett Bangkok',
        description: "We'd love ot hear from you!",
        thankEmailAboveThreshold: 'Thank you for taking the time to complete our guest feedback survey!',
        thankEmailBelowThreshold: 'Thank you for taking the time to complete our guest feedback survey!',
        isActive: true,
        coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
        createdAt: '2017-01-23T07:48:12.991Z',
        activeAt: '2015-10-08T07:04:00.000Z',
        inactiveAt: null,
        surveyType: 'Restaurant',
      },
      relationships: {
        questions: {
          data: [
            {
              id: 'd3afbcf2b1d60af845dc',
              type: 'question',
            },
            {
              id: '940d229e4cd87cd1e202',
              type: 'question',
            },
          ],
        },
      },
    },
  ],
  meta: {
    page: 1,
    pages: 4,
    pageSize: 5,
    records: 20,
  },
};

describe('Serializer', () => {
  describe('.deserialize()', () => {
    it('deserializes the survey response', () => {
      expect(Serializer.deserialize('survey', surveyResponse)).toEqual([
        {
          id: 'd5de6a8f8f5f1cfe51bc',
          title: 'Scarlett Bangkok',
          description: "We'd love ot hear from you!",
          thankEmailAboveThreshold: 'Thank you for taking the time to complete our guest feedback survey!',
          thankEmailBelowThreshold: 'Thank you for taking the time to complete our guest feedback survey!',
          isActive: true,
          coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
          createdAt: '2017-01-23T07:48:12.991Z',
          activeAt: '2015-10-08T07:04:00.000Z',
          inactiveAt: null,
          questions: ['d3afbcf2b1d60af845dc', '940d229e4cd87cd1e202'],
          surveyType: 'Restaurant',
        },
      ]);
    });
  });
});
