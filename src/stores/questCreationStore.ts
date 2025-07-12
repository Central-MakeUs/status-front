import { create } from 'zustand';
import { getTodayString } from '@/utils/date';

import type { Attribute } from '@/types/attribute';
import type { Category } from '@/types/category';
import type { UserMainQuest, UserSubQuest } from '@/types/quest';

interface QuestCreationState {
  selectedMentalityAttribute: Attribute | null;
  selectedSkillAttribute: Attribute | null;
  selectedCategory: Category | null;
  selectedMainQuest: UserMainQuest | null;
  selectedSubQuestIds: string[];
  subQuests: UserSubQuest[];
  setSelectedMentalityAttribute: (attribute: Attribute | null) => void;
  setSelectedSkillAttribute: (attribute: Attribute | null) => void;
  setSelectedCategory: (category: Category | null) => void;
  setSelectedMainQuest: (mainQuest: UserMainQuest | null) => void;
  setSubQuests: (subQuests: UserSubQuest[]) => void;
  updateSubQuest: (subQuest: UserSubQuest) => void;
  toggleSubQuestSelection: (subQuestId: string) => void;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
  getSelectedSubQuests: () => UserSubQuest[];
}

export const useQuestCreationStore = create<QuestCreationState>()(
  (set, get) => ({
    selectedMentalityAttribute: null,
    selectedSkillAttribute: null,
    selectedCategory: null,
    selectedMainQuest: null,
    subQuests: [],
    selectedSubQuestIds: [],
    setSelectedMentalityAttribute: (attribute) =>
      set(() => ({
        selectedMentalityAttribute: attribute,
        selectedCategory: null,
        selectedMainQuest: null,
        subQuests: [],
        selectedSubQuestIds: [],
      })),

    setSelectedSkillAttribute: (attribute) =>
      set(() => ({
        selectedSkillAttribute: attribute,
        selectedCategory: null,
        selectedMainQuest: null,
        subQuests: [],
        selectedSubQuestIds: [],
      })),

    setSelectedCategory: (category) =>
      set(() => ({
        selectedCategory: category,
        selectedMainQuest: null,
        subQuests: [],
        selectedSubQuestIds: [],
      })),

    setSelectedMainQuest: (mainQuest) =>
      set(() => ({
        selectedMainQuest: mainQuest
          ? {
              ...mainQuest,
              startDate: getTodayString(),
              endDate: '',
            }
          : null,
        subQuests: [],
        selectedSubQuestIds: [],
      })),

    setSubQuests: (newSubQuests) =>
      set((state) => {
        const updatedSubQuests = newSubQuests.map((newSubQuest) => {
          const existingSubQuest = state.subQuests.find(
            (existing) => existing.id === newSubQuest.id
          );
          return existingSubQuest || newSubQuest;
        });

        return { subQuests: updatedSubQuests };
      }),

    updateSubQuest: (updatedSubQuest) =>
      set((state) => ({
        subQuests: state.subQuests.map((subQuest) =>
          subQuest.id === updatedSubQuest.id ? updatedSubQuest : subQuest
        ),
      })),

    toggleSubQuestSelection: (subQuestId) =>
      set((state) => {
        const isSelected = state.selectedSubQuestIds.includes(subQuestId);

        if (isSelected) {
          return {
            selectedSubQuestIds: state.selectedSubQuestIds.filter(
              (id) => id !== subQuestId
            ),
          };
        }
        return {
          selectedSubQuestIds: [...state.selectedSubQuestIds, subQuestId],
        };
      }),

    setStartDate: (startDate) =>
      set((state) => ({
        selectedMainQuest: state.selectedMainQuest
          ? {
              ...state.selectedMainQuest,
              startDate,
            }
          : null,
      })),

    setEndDate: (endDate) =>
      set((state) => ({
        selectedMainQuest: state.selectedMainQuest
          ? {
              ...state.selectedMainQuest,
              endDate,
            }
          : null,
      })),

    getSelectedSubQuests: () => {
      const { subQuests, selectedSubQuestIds } = get();
      return subQuests.filter((subQuest) =>
        selectedSubQuestIds.includes(subQuest.id)
      );
    },
  })
);
