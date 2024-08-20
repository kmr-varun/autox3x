import React from 'react';
import { CarbonIconType } from '@carbon/icons-react';

interface IconButton {
  label: string;
  Icon: CarbonIconType;
  iconSize?: number;
  className?: string;
  isSave: boolean;
  onClick: (option: any) => void;
}

const IconButton: React.FC<IconButton> = ({
  label,
  Icon,
  iconSize = 20,
  className,
  isSave,
  onClick,
}) => {

  return (
    <button
      className={`flex items-center justify-center w-fit rounded-xl px-6 py-2 bg-[#080808] border-[1px] border-[#4F4F4F] text-sm font-medium text-white focus:outline-none ${className}`}
      onClick={() => {
        isSave ? 
        onClick(true)
        :
        onClick({
          columnId: ',',
          columnName: '',
          columnType: '',
          fromValue: '',
          toValue: '',
          operator: '',
          operatorString: '',
          multi: false,
          conditionType: 'AND'
        })
      }}
    >
      <Icon style={{ fontSize: iconSize }} className="mr-2" />
      {label}
    </button>
  );
};


export default IconButton;
