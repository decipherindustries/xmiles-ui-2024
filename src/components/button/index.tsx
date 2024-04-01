import React from 'react';
import {Card, CardBody} from "@nextui-org/react";
import {Switch} from "@nextui-org/react";

export interface ControlButtonProps {
  label: string;
  state?: boolean;
  onPress?: () => void;
  momentary?: boolean;
  color?: string;
}

export const ControlButton: React.FC<ControlButtonProps> = ({
  label,
  color,
  state = false, 
  momentary = false,
  onPress = () => true,
}) => {
  let classes = '';
  const styles: Record<string, string> = {};

  if (state) {
    classes = 'bg-green-600';
  }

  if (momentary) {
    classes = 'bg-blue-600';
  }

  if (color && color.startsWith('#')) {
    styles.backgroundColor = color;
  }

  return (
    <Card radius='lg' shadow="sm" onPress={onPress} isPressable>
      <CardBody className={`overflow-hidden position-relative p-5 ${classes}`} style={styles}>
        <div style={{ width: '130px' }}>
          <p className="text-l" style={{ marginTop: '6px' }}>{label}</p>
          {!momentary && (<div style={{ position: 'absolute', bottom: '12px', left: '18px' }}>
            <Switch isSelected={state} />
          </div>)}
        </div>
      </CardBody>
    </Card>
  )
}
