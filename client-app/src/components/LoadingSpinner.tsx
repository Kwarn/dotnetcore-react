import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface ILoadingSpinnerProps {
  isInverted?: boolean;
  content?: string;
}

const LoadingSpinner = ({
  isInverted = false,
  content = 'Loading...',
}: ILoadingSpinnerProps) => {
  return (
    <Dimmer active={true} inverted={isInverted}>
      <Loader content={content} />
    </Dimmer>
  );
};

export default LoadingSpinner;
