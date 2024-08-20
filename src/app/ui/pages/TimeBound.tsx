import { setWorkflowDetails } from '@/app/slices/workflowSlice';
import { WorkflowState } from '@/app/types/workflowTypes';
import { ChevronDown, Save } from '@carbon/icons-react';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import IconButton from '../components/Buttons/IconButton';

const TimeBound = () => {
    const [triggerType, setTriggerType] = useState<'same-day' | 'before' | 'after'>('same-day');
  const [triggerTime, setTriggerTime] = useState<string>('08:00');
  const [triggerPeriod, setTriggerPeriod] = useState<number | ''>(1); // Allow empty string as a valid state
  const [triggerFrequency, setTriggerFrequency] = useState<'days' | 'weeks' | 'months'>('days');
  const [eventDate, setEventDate] = useState<string>('2024-08-15'); // Add state for event date
  const [isTriggerTypeOpen, setIsTriggerTypeOpen] = useState(false);
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);

  // Convert 24-hour time format to 12-hour time format with AM/PM
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = ((hours + 11) % 12 + 1);
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Format the text based on user selections
  const getFormattedText = () => {
    const formattedTime = formatTime(triggerTime);
    const unitText = triggerFrequency === 'days' ? 'day' : triggerFrequency === 'weeks' ? 'week' : 'month';
    const amountText = triggerPeriod && triggerPeriod > 1 ? `${triggerPeriod} ${unitText}s` : `1 ${unitText}`;

    if (triggerType === 'same-day') {
      return `Trigger on the same day at ${formattedTime}`;
    } else if (triggerType === 'before') {
      return `Trigger ${amountText} before the date at ${formattedTime}`;
    } else { // 'after'
      return `Trigger ${amountText} after the date at ${formattedTime}`;
    }
  };

  useEffect(() => {
    // Update the formatted text whenever user selections change
    getFormattedText();
  }, [triggerType, triggerTime, triggerPeriod, triggerFrequency, eventDate]);

  const handleTriggerTypeChange = (type: 'same-day' | 'before' | 'after') => {
    setTriggerType(type);
    setIsTriggerTypeOpen(false);
  };

  const handleUnitChange = (unit: 'days' | 'weeks' | 'months') => {
    setTriggerFrequency(unit);
    setIsUnitDropdownOpen(false);
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value === '' ? '' : parseInt(value);
    setTriggerPeriod(numericValue);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventDate(e.target.value);
  };


  
  const dispatch = useDispatch();

  const handleUpdateWorkflow = (option: any) => {
    const updatedDetails: Partial<WorkflowState> = {
      workflowData: option
    };
    dispatch(setWorkflowDetails(updatedDetails));
  };

  const handleSave = () => {
    const data = [{
      triggerType,
      triggerTime,
      triggerPeriod,
      triggerFrequency,
      eventDate
    }];
    handleUpdateWorkflow(data);
  };
  return (
    <div className="relative my-4 max-w text-white">
      <div className="flex flex-col gap-6 mb-6 w-full">
        <h1 className="text-lg font-bold mb-4">{getFormattedText()}</h1>

        <div className="relative text-left">
          <div className='flex gap-4'>
            <div className='py-3 px-6 bg-[#35363A] rounded-xl w-max text-center'>Trigger On</div>
            <button
              className="flex items-center justify-between rounded-xl px-8 py-3 w-56 bg-transparent text-sm font-medium text-white focus:outline-none border bg-[#242428] border-[#848694]"
              onClick={() => setIsTriggerTypeOpen(!isTriggerTypeOpen)}
            >
              {triggerType === 'same-day' ? 'Same Day' : triggerType === 'before' ? 'Before' : 'After'}
              <ChevronDown className="ml-2" />
            </button>
            <input
              type="date"
              id="event-date"
              value={eventDate}
              onChange={handleDateChange}
              className="bg-transparent w-56 border border-[#848694] rounded-lg py-2 px-3 text-white"
            />
          </div>

          {isTriggerTypeOpen && (
            <div className="absolute mt-2 w-44 mx-3 rounded-lg z-10 bg-[#242428] max-h-60 overflow-y-auto custom-scrollbar top-full left-0">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {['same-day', 'before', 'after'].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTriggerTypeChange(type as 'same-day' | 'before' | 'after')}
                    className="w-full text-left px-6 py-4 text-white border-b-[1px] border-[#39393A] text-sm hover:bg-[#19191B]"
                    role="menuitem"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative text-left w-max">
          <div className="flex flex-1 justify-start gap-4">
            {triggerType !== 'same-day' && (
              <div className='flex flex-1 gap-4'>
                <input
                  type="number"
                  id="trigger-period"
                  value={triggerPeriod === '' ? '' : triggerPeriod}
                  onChange={handlePeriodChange}
                  className="flex-0 bg-transparent border border-[#848694] rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
                <div className="relative text-left">
                  <button
                    onClick={() => setIsUnitDropdownOpen(!isUnitDropdownOpen)}
                    className="flex-1 flex items-center justify-between w-44 rounded-xl px-6 py-3 bg-transparent text-sm font-medium text-white focus:outline-none border bg-[#242428] border-[#848694]"
                  >
                    {triggerFrequency.charAt(0).toUpperCase() + triggerFrequency.slice(1)}
                    <ChevronDown className="ml-2" />
                  </button>

                  {isUnitDropdownOpen && (
                    <div className="origin-center absolute mt-4 w-full rounded-lg z-10 bg-[#242428] max-h-60 overflow-y-auto custom-scrollbar">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {['days', 'weeks', 'months'].map((unit) => (
                          <button
                            key={unit}
                            onClick={() => handleUnitChange(unit as 'days' | 'weeks' | 'months')}
                            className="w-full text-left px-6 py-4 text-white border-b-[1px] border-[#39393A] text-sm hover:bg-[#19191B]"
                            role="menuitem"
                          >
                            {unit.charAt(0).toUpperCase() + unit.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="flex items-center w-48 gap-4">
              <label htmlFor="trigger-time" className="text-sm font-medium">At:</label>
              <input
                type="time"
                id="trigger-time"
                value={triggerTime}
                onChange={(e) => setTriggerTime(e.target.value)}
                className="flex-1 bg-transparent border border-[#848694] rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <IconButton label="Save" Icon={Save} onClick={handleSave} isSave={false} />
        </div>
      </div>
    </div>
  )
}

export default TimeBound