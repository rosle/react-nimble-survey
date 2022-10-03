import React from 'react';

import { Meta, Story } from '@storybook/react';

import Carousel, { CarouselProps } from '.';

export default {
  component: Carousel,
} as Meta;

const Template = <T extends React.ReactNode>(args: CarouselProps<T>) => <Carousel {...args}/>;

export const Default: Story<CarouselProps<React.ReactNode>> = Template.bind({});
Default.storyName = Carousel.name;
Default.args = {
  id: 'carouselExample',
  items: [
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis tellus vel tellus tempus dictum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed faucibus augue enim. Morbi in blandit sem, sit amet sollicitudin nulla. Vivamus vehicula velit rhoncus lorem feugiat, fringilla aliquam mi facilisis. Pellentesque in nunc accumsan ligula efficitur volutpat ut eget metus. Sed nec semper urna. Aenean vel tempus elit. Nunc quam sapien, malesuada varius vestibulum in, fermentum et magna. Duis dolor augue, sodales lobortis ultricies quis, scelerisque sit amet felis. Cras ac massa hendrerit, aliquet quam tempus, imperdiet lorem. Maecenas quis nibh non orci tincidunt fringilla. Nam quis hendrerit diam. Aliquam condimentum mi erat, non eleifend sapien pharetra ac. Ut imperdiet quis massa et tristique. Donec eu ipsum ac nisl congue rutrum.</p>,
    <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin sit amet leo neque. Ut suscipit laoreet eros non sodales. Suspendisse ut posuere ante. Aenean varius vulputate leo. Mauris vel sagittis nulla, sed fermentum augue. Nulla id justo tortor. Mauris sed ante eget dui porttitor rhoncus.</p>,
    <p>Curabitur sed mattis ante. Vestibulum at lobortis urna, in viverra ante. Proin tincidunt augue ligula, a pellentesque quam efficitur non. Integer aliquet pharetra dolor, id tempus justo facilisis vitae. Donec elementum et arcu non commodo. In commodo, sapien id efficitur pharetra, velit nunc molestie lorem, eget imperdiet ligula arcu gravida orci. Duis efficitur velit sed nulla tempor, sed semper arcu elementum. Maecenas congue sodales risus. Proin diam massa, accumsan vel commodo in, fringilla vel sem. Donec tincidunt nisi non urna consequat ultricies eget in tellus. Nam eleifend a ipsum a congue. Curabitur id laoreet elit.</p>
  ],
};

