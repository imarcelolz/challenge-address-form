import React from 'react';
import { SuccessViewProps } from './Success.types';

const SuccessView = (props: SuccessViewProps) => {
  return (
    <div>
      Success, your form was sent {props.user.name}
      <button className="back" onClick={props.onBack} />
    </div>
  );
};

SuccessView.defaultProps = {};

export default SuccessView;
