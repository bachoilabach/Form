import { SurveyResponse } from '@/models/survey.model';
import { create } from 'zustand';

interface SurveyStore {
  submittedSurvey: SurveyResponse | null;
  isSuccessModalOpen: boolean;
  openSuccessModal: (survey: SurveyResponse) => void;
  closeSuccessModal: () => void;
}

export const useSurveyStore = create<SurveyStore>((set) => ({
  submittedSurvey: null,
  isSuccessModalOpen: false,
  openSuccessModal: (survey: SurveyResponse) =>
    set({ isSuccessModalOpen: true, submittedSurvey: survey }),
  closeSuccessModal: () => set({ isSuccessModalOpen: false }),
}));
