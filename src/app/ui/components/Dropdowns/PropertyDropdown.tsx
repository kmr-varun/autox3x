"use client";
import React, { useState } from 'react';
import { ChevronDown } from '@carbon/icons-react';

import { useDispatch, useSelector } from 'react-redux';
import './customScrollbar.css';  // Import custom scrollbar styles
import { Condition } from '@/app/types/workflowTypes';
import { selectConditions } from '@/app/helpers/selectors';
import { updateConditionField } from '@/app/slices/workflowSlice';
import { AppDispatch } from '@/store';

interface PropertyDropdownProps {
  title: string;
  options: any[];
  selectColumn?: keyof Condition;
  condindex?: number;
}

const PropertyDropdown: React.FC<PropertyDropdownProps> = ({ title, options, selectColumn, condindex }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const conditions = useSelector(selectConditions);
  const condLen = conditions.length - 1;
  const dispatch = useDispatch<AppDispatch>();
  const updateCondition = (index: number, updates: Partial<Condition>) => {
    dispatch(updateConditionField({
      index,
      field: updates
    }));
    setIsOpen(false);
  };
  

  return (
    <div className="relative text-left">
      <button
        className="flex items-center justify-between rounded-xl mx-auto px-8 py-3 w-56 bg-transparent text-sm font-medium text-white focus:outline-none border bg-[#242428] border-[#848694]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown className="ml-2" />
      </button>

      {isOpen && (
        <div className="origin-center absolute mt-4 w-full rounded-lg z-10 shadow-lg bg-[#242428] max-h-60 overflow-y-auto custom-scrollbar">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option, index) => (
              <div key={index}>
                <button
                  onClick={() => selectColumn == 'fromValue' ? updateCondition(condindex!, {fromValue: option}) : updateCondition(condLen, {toValue: option})}
                  className="w-full text-left px-6 py-4 text-white border-b-[1px] border-[#39393A] text-sm hover:bg-[#19191B]"
                  role="menuitem"
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDropdown;
