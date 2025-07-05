import { create } from 'zustand';
import type { Attribute } from '@/types/attribute';

interface QuestCreationState {
  selectedMentalityAttribute: Attribute | null;
  selectedSkillAttribute: Attribute | null;
  setSelectedMentalityAttribute: (attribute: Attribute | null) => void;
  setSelectedSkillAttribute: (attribute: Attribute | null) => void;
}

export const useQuestCreationStore = create<QuestCreationState>()((set) => ({
  selectedMentalityAttribute: null,
  selectedSkillAttribute: null,

  setSelectedMentalityAttribute: (attribute) =>
    set(() => ({ selectedMentalityAttribute: attribute })),

  setSelectedSkillAttribute: (attribute) =>
    set(() => ({ selectedSkillAttribute: attribute })),
}));
