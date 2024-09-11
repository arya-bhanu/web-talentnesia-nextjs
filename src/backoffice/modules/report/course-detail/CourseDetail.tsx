'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDetailProgram } from '../api/reportApi';
import { useParams, useSearchParams } from 'next/navigation';
import { APIReportProgramDetail } from '../report.type';
import CoursesProgress from '../../program/components/courses-progres/CoursesProgress';
import Loading from '@/components/loading';
import {
  convertDateIntoIDDate,
  convertTimeToMinutes,
  YMDIntoDate,
} from '@/helpers/formatter.helper';
import AccordionPanelDraggable from '../components/accordion-panel-draggable';
import { CustomTitles } from '@/backoffice/components/title-navbar/titleNavbar.type';
import { registerCustomizations } from '@/backoffice/components/global-customization/globalCustomizations';

interface ReportDetailProps {}

const ReportDetail: React.FC<ReportDetailProps> = () => {
  const [activeAccordion, setActiveAccordion] = useState<number>(0);
  const [programDataState, setProgramDataState] =
    useState<null | APIReportProgramDetail>(null);
  const pathname = useSearchParams();
  const id = pathname.get('id');

  const { data: programData, isLoading: isLoadingProgramData } = useQuery({
    queryKey: ['detail', 'program', id],
    queryFn: () => fetchDetailProgram(id),
    enabled: id !== null,
  });

  useEffect(() => {
    if (programData?.data) {
      setProgramDataState(programData?.data);
    }
  }, [JSON.stringify(programData?.data)]);

  useEffect(() => {
    if (programDataState && programDataState.id) {
      const customTitlesDetail: { [key: string]: string } = {};
      const customBreadCrumbsDetail: { [key: string]: string } = {};

      customTitlesDetail[programDataState.id] = programDataState.name;
      customBreadCrumbsDetail[programDataState.id] = programDataState.name;

      console.log(customTitlesDetail);
      console.log(customBreadCrumbsDetail);

      registerCustomizations(
        'courseDetail',
        customTitlesDetail,
        customBreadCrumbsDetail,
      );
    }
  }, [programDataState]);

  return (
    <Loading isLoading={isLoadingProgramData}>
      <div className="p-4 bg-[#FFFFFF] rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-poppins font-semibold text-[25px]">
            Course Detail
          </h1>
        </div>

        {programDataState && (
          <>
            <CoursesProgress
              progress={programDataState.progress}
              className="flex-1 mb-6"
              startDate={convertDateIntoIDDate(
                YMDIntoDate(programDataState.startDate),
              )}
              endDate={convertDateIntoIDDate(
                YMDIntoDate(programDataState.endDate),
              )}
              completedSessions={Math.round(programDataState.progress * 5)}
              totalSessions={500}
            />
            {programDataState.chapters.map((el, index) => {
              return (
                <AccordionPanelDraggable
                  key={el.id}
                  contents={el.contents.map((el) => {
                    return {
                      date: new Date(),
                      durationMinute: convertTimeToMinutes(el.duration),
                      title: el.title,
                      type: el.type,
                      chapterId: el.chapterId,
                      id: el.id,
                      order: el.order,
                      isexam: Boolean(el.isexam),
                    };
                  })}
                  activeAccordion={activeAccordion}
                  index={index}
                  setActiveAccordion={setActiveAccordion}
                  title={el.title}
                  totalCurriculum={10}
                  totalMinuteDuration={Number(el.duration) || 0}
                  status="Delivered"
                />
              );
            })}
          </>
        )}
      </div>
    </Loading>
  );
};

export default ReportDetail;
