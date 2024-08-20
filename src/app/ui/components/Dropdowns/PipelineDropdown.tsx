"use client";
import React, { useState } from "react";
import { Add } from "@carbon/icons-react";
import "./customScrollbar.css"; // Import custom scrollbar styles

import { useDispatch, useSelector } from "react-redux";
import { selectWorkflow } from "@/app/helpers/selectors";
import { setWorkflowDetails } from "@/app/slices/workflowSlice";
import { WorkflowState } from "@/app/types/workflowTypes";
import { setSetupPipeline } from "@/app/slices/setupSlice";

interface PipelineDropdownProps {
  pipelines: any[];
}

const PipelineDropdown: React.FC<PipelineDropdownProps> = ({ pipelines }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const workflow = useSelector(selectWorkflow);

  const handleUpdateWorkflow = (option: any) => {
    const updatedDetails: Partial<WorkflowState> = {
      pipelineId: option.id,
      pipelineName: option.name
    };
    setIsOpen(false);
    dispatch(setSetupPipeline(true));
    dispatch(setWorkflowDetails(updatedDetails));
  };
  return (
    <div className="relative text-left">
      <button
        className="flex items-center justify-center w-full rounded-xl px-8 py-3 bg-[#19191B] text-sm font-medium text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Add size={30} className="mr-2" />
        {workflow.pipelineName || "Pipeline"}
      </button>

      {isOpen && (
        <div className="origin-center absolute mt-4 w-full rounded-lg z-10 shadow-lg bg-[#242428] max-h-60 overflow-y-auto custom-scrollbar">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {pipelines.map((pipeline) => (
              <button
                key={pipeline.id}
                onClick={() => handleUpdateWorkflow(pipeline)}
                className="w-full text-left px-6 py-4 text-white border-b-[1px] border-[#39393A] text-sm hover:bg-[#19191B]"
                role="menuitem"
              >
                {pipeline.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PipelineDropdown;


