import { create } from 'zustand';
import type { Attribute } from '@/types/attribute';
import type { Category } from '@/types/category';
import type { MainQuest } from '@/types/quest';

interface QuestCreationState {
  selectedMentalityAttribute: Attribute | null;
  selectedSkillAttribute: Attribute | null;
  selectedCategory: Category | null;
  selectedMainQuest: MainQuest | null;
  setSelectedMentalityAttribute: (attribute: Attribute | null) => void;
  setSelectedSkillAttribute: (attribute: Attribute | null) => void;
  setSelectedCategory: (category: Category | null) => void;
  setSelectedMainQuest: (mainQuest: MainQuest | null) => void;
}

export const useQuestCreationStore = create<QuestCreationState>()((set) => ({
  selectedMentalityAttribute: null,
  selectedSkillAttribute: null,
  selectedCategory: null,
  selectedMainQuest: null,

  setSelectedMentalityAttribute: (attribute) =>
    set(() => ({ selectedMentalityAttribute: attribute })),

  setSelectedSkillAttribute: (attribute) =>
    set(() => ({ selectedSkillAttribute: attribute })),

  setSelectedCategory: (category) =>
    set(() => ({ selectedCategory: category })),

  setSelectedMainQuest: (mainQuest) =>
    set(() => ({ selectedMainQuest: mainQuest })),
}));
