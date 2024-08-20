"use client";
import React, { useState } from "react";
import { Add } from "@carbon/icons-react";

import { useDispatch, useSelector } from "react-redux";
import { Triggers } from "@/app/types/inputType";
import { RootState } from "@/store";
import { selectWorkflow } from "@/app/helpers/selectors";
import { setWorkflowDetails } from "@/app/slices/workflowSlice";
import { Actions, Condition, WorkflowState } from "@/app/types/workflowTypes";
import { addAction, addCondition } from "@/app/helpers/actions";
import { setSetupTrigger } from "@/app/slices/setupSlice";

interface OptionsDropdownProps {
  title: string;
  options: any;
}

const OptionsDropdown: React.FC<OptionsDropdownProps> = ({
  title,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const keyExists = Object.keys(options).includes("action");
  const dispatch = useDispatch();

  const handleUpdateWorkflow = (option: any) => {
    const updatedDetails: Partial<WorkflowState> = {
      id: option.id,
      name: option.name,
      workflowType: option.type,
    };
    setIsOpen(false);
    dispatch(setSetupTrigger(true));
    dispatch(setWorkflowDetails(updatedDetails));
  };

  const handleAddAction = (act: Actions) => {
    const newAction: Actions = {
      id: act.id,
      name: act.name,
      operation: act.operation,
      setup: false,
      data: []
    };
    setIsOpen(false);
    dispatch(addAction(newAction));
  };


  return (
    <div className="relative text-left">
      <button
        className="flex items-center justify-center w-full rounded-xl px-8 py-3 bg-[#19191B] text-sm font-medium text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Add size={30} className="mr-2" />
        {title}
      </button>

      {isOpen && (
        <div className="origin-center absolute mt-4 w-full rounded-lg z-10 shadow-lg bg-[#242428] max-h-60 overflow-y-auto custom-scrollbar">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {Object.keys(options).map((key) => (
              <div key={key}>
                <div className="px-4 py-2 text-[#777777] font-bold text-xs">
                  {key.toUpperCase()}
                </div>
                {(options[key as keyof typeof options] as any[]).map(
                  (option: any, index: number) => (
                    <button
                      key={index}
                      onClick={() =>
                        keyExists
                          ? handleAddAction(option) : handleUpdateWorkflow(option)
                      }
                      className="w-full text-left px-6 py-4 text-white border-b-[1px] border-[#39393A] text-sm hover:bg-[#19191B]"
                      role="menuitem"
                    >
                      {option.name}
                    </button>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionsDropdown;
