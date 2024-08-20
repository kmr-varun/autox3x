import React, { useState } from 'react';
import { ChevronDown } from '@carbon/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { Condition } from '@/app/types/workflowTypes';
import { Pipeline } from '@/app/types/inputType';
import { updateConditionField } from '@/app/helpers/actions';
import { selectWorkflow } from '@/app/helpers/selectors';

interface ConditionDropdownProps {
  title: string;
  options: Pipeline[];
  width?: string;
  bgColor?: string;
  borderColor?: string;
  condindex: number;
}

const ConditionDropdown: React.FC<ConditionDropdownProps> = ({
  title,
  options,
  condindex
}) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const workflow = useSelector(selectWorkflow);
  const getEntitiesByPipelineId = (pipelineId: string) => {
    const pipeline = options.find((p) => p.id === pipelineId);
    return pipeline ? pipeline.entity : null;
  };

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
        className={`flex items-center justify-between rounded-xl mx-auto px-8 py-3 w-56 bg-transparent text-sm font-medium text-white focus:outline-none border bg-[#242428] border-[#848694]`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ChevronDown className="ml-2" />
      </button>

      {isOpen && (
        <div className="origin-center absolute mt-4 w-full rounded-lg z-10 shadow-lg bg-[#0B0B0B] max-h-60 overflow-y-auto custom-scrollbar">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">

            {getEntitiesByPipelineId(workflow.pipelineId)?.map((pipe: any) => (
              <div key={pipe.id}>
              <button
                onClick={() => updateCondition(condindex, {
                  columnId: pipe.id,
                  columnName: pipe.name,
                  columnType: pipe.type
                })}
                className="w-full text-left px-6 py-2 text-white border-b-[1px] border-[#39393A] text-sm hover:bg-[#19191B]"
                role="menuitem"
              >
                {pipe.name} 
              </button>
            </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConditionDropdown;
