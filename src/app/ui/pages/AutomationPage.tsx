import React, { useEffect, useState } from 'react';
import AutomationSettingPanel from './AutomationSettingPanel';
import TriggerSettings from './TriggerSettings';
import { InputData, Pipeline, Workflow } from '@/app/types/inputType';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { fetchPipelineData } from '@/apiService';
import * as data from '../../data.json';

import Footer from './Footer';

export const workflowData: InputData = data;
const workflows: Workflow = workflowData.workflow;

const handleSelect = (option: string) => {
  console.log('Selected:', option);
};

const AutomationPage: React.FC = () => {
  const [pipelineData, setPipelineData] = useState<Pipeline[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const setupPipeline = useSelector((state: RootState) => state.setup.setupPipeline);
  const setupCondition = useSelector((state: RootState) => state.setup.setupCondition);

  useEffect(() => {
    const loadPipelineData = async () => {
      console.log('Fetching pipeline data...');
      try {
        const data = await fetchPipelineData();
        console.log('Pipeline data fetched:', data);
        setPipelineData(data);
      } catch (err) {
        console.error('Error fetching pipeline data:', err);
        setError('Failed to fetch pipeline data');
      } finally {
        setLoading(false);
      }
    };

    loadPipelineData();
  }, []);

  return (
    <div className='w-screen h-screen bg-black text-white'>
      <div className='h-[92%] flex flex-row p-4 gap-4'>
        <div className='basis-1/4 bg-[#0B0B0C] rounded-[12px] border-solid border-[1px] border-[#242428] flex flex-col p-8'>
          <AutomationSettingPanel
            workflowData={workflows}
            pipelineData={pipelineData || []} 
            handleSelect={handleSelect}
          />
        </div>

        <div className='basis-3/4 bg-[#242428] rounded-[12px] h-full flex flex-1 items-center justify-center'>
          <div id='main' className='w-full p-10'>
            {loading && <div>Loading pipeline data...</div>}
            {error && <div>{error}</div>}
            {setupPipeline && !setupCondition && pipelineData && (
              <TriggerSettings dropdownOptions={pipelineData} handleSelect={handleSelect} />
              // <ActionSettings handleSelect={function (selectedOption: string): void {
              //   throw new Error('Function not implemented.');
              // } } />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AutomationPage;
