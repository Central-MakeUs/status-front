import { create } from 'zustand';
import type { Attribute } from '@/types/attribute';
import type { Category } from '@/types/category';
import type { MainQuest, UserSubQuest } from '@/types/quest';

interface QuestCreationState {
  selectedMentalityAttribute: Attribute | null;
  selectedSkillAttribute: Attribute | null;
  selectedCategory: Category | null;
  selectedMainQuest: MainQuest | null;
  selectedSubQuests: UserSubQuest[];
  setSelectedMentalityAttribute: (attribute: Attribute | null) => void;
  setSelectedSkillAttribute: (attribute: Attribute | null) => void;
  setSelectedCategory: (category: Category | null) => void;
  setSelectedMainQuest: (mainQuest: MainQuest | null) => void;
  toggleSelectedSubQuest: (subQuest: UserSubQuest) => void;
}

export const useQuestCreationStore = create<QuestCreationState>()((set) => ({
  selectedMentalityAttribute: null,
  selectedSkillAttribute: null,
  selectedCategory: null,
  selectedMainQuest: null,
  selectedSubQuests: [],

  setSelectedMentalityAttribute: (attribute) =>
    set(() => ({ selectedMentalityAttribute: attribute })),

  setSelectedSkillAttribute: (attribute) =>
    set(() => ({ selectedSkillAttribute: attribute })),

  setSelectedCategory: (category) =>
    set(() => ({ selectedCategory: category })),

  setSelectedMainQuest: (mainQuest) =>
    set(() => ({ selectedMainQuest: mainQuest })),

  toggleSelectedSubQuest: (subQuest) =>
    set((state) => {
      const existingIndex = state.selectedSubQuests.findIndex(
        (quest) => quest.id === subQuest.id
      );

      if (existingIndex >= 0) {
        return {
          selectedSubQuests: state.selectedSubQuests.filter(
            (quest) => quest.id !== subQuest.id
          ),
        };
      } else {
        return {
          selectedSubQuests: [...state.selectedSubQuests, subQuest],
        };
      }
    }),
}));
