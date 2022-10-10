import React from 'react';
import { Message } from 'semantic-ui-react';

interface IValidationErrorsProps {
  errors: string[];
}

const ValidationErrors = ({ errors }: IValidationErrorsProps) => {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((err: any, i) => (
            <Message.Item key={i}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
};

export default ValidationErrors;
