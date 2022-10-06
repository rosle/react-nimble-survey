import React from 'react';

export const backgroundImageTestIds = {
  backgroundImage: 'background-image',
};

export interface BackgroundImageProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
}

const BackgroundImage = ({ imageUrl }: BackgroundImageProps) => {
  return (
    <div className="background-image" data-test-id={backgroundImageTestIds.backgroundImage}>
      <img src={imageUrl} alt="background" />
    </div>
  );
};

export default BackgroundImage;
