import { useSurveyStore } from '../surveyStore';

export function useSurveySelector() {
  const submittedSurvey = useSurveyStore((state) => state.submittedSurvey);
  const isSuccessModalOpen = useSurveyStore((state) => state.isSuccessModalOpen);
  const openSuccessModal = useSurveyStore((state) => state.openSuccessModal);
  const closeSuccessModal = useSurveyStore((state) => state.closeSuccessModal);
  return {
    isSuccessModalOpen,
    openSuccessModal,
    closeSuccessModal,
    submittedSurvey
  };
}
