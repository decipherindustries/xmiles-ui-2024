import React from 'react';
import { ControlButton, ControlButtonProps } from '../button';

export interface ButtonGroupProps {
  buttons: ControlButtonProps[];
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons }) => {
  return (
    <div className="buttons">
      {buttons.map((button, index) => (
        <ControlButton key={index} {...button} />
      ))}
    </div>
  )
};