import { Filters } from '@/app/types/inputType';
import { ChevronDown } from '@carbon/icons-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { workflowData } from '../../pages/AutomationPage';
import { updateConditionField } from '@/app/helpers/actions';
import { AppDispatch } from '@/store';
import { Condition } from '@/app/types/workflowTypes';
import { selectConditions } from '@/app/helpers/selectors';


interface OperatorDropdownProps {
  title: string | undefined;
  datatype: string;
  condindex?: number;
}

const OperatorDropdown: React.FC<OperatorDropdownProps> = ({ title, datatype, condindex}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const updateCondition = (index: number, updates: Partial<Condition>) => {
    dispatch(updateConditionField({
      index,
      field: updates
    }));
    setIsOpen(false);
  };

  const filters: Filters = workflowData.filters;
  const filterType = filters.filter.find(f => f.type === datatype);
  const options = filterType ? filterType.conditions : [];

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
                  onClick={() => updateCondition(condindex!, {operator: option.operator, operatorString: option.label, multi: option.multi})}
                  className="w-full text-left px-6 py-4 text-white border-b-[1px] border-[#39393A] text-sm hover:bg-[#19191B]"
                  role="menuitem"
                >
                  {option.label}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OperatorDropdown;
