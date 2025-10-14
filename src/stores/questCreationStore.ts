import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getTodayString } from '@/shared/lib/date';

import type { Attribute } from '@/entities/attribute/model/types';
import type { MainQuest, Theme } from '@/entities/quest/model/types';
import type { SubQuest } from '@/entities/quest/model/types';

interface QuestCreationState {
  selectedAttribute: Attribute | null;
  selectedTheme: Theme | null;
  selectedMainQuest: MainQuest | null;
  selectedSubQuestIds: number[];
  subQuests: SubQuest[];
  startDate: string;
  endDate: string;
  setSelectedAttribute: (attribute: Attribute | null) => void;
  setSelectedTheme: (theme: Theme | null) => void;
  setSelectedMainQuest: (mainQuest: MainQuest | null) => void;
  setSubQuests: (subQuests: SubQuest[]) => void;
  updateSubQuest: (subQuest: SubQuest) => void;
  toggleSubQuestSelection: (subQuestId: number) => void;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
  getSelectedSubQuests: () => SubQuest[];
  clear: () => void;
}

export const useQuestCreationStore = create<QuestCreationState>()(
  devtools(
    (set, get) => ({
      selectedAttribute: null,
      selectedTheme: null,
      selectedMainQuest: null,
      subQuests: [],
      selectedSubQuestIds: [],
      startDate: '',
      endDate: '',

      setSelectedAttribute: (attribute) =>
        set(() => ({
          selectedAttribute: attribute,
          selectedTheme: null,
          selectedMainQuest: null,
          subQuests: [],
          selectedSubQuestIds: [],
        })),

      setSelectedTheme: (theme) =>
        set(() => ({
          selectedTheme: theme,
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
        set(() => ({
          startDate,
        })),

      setEndDate: (endDate) =>
        set(() => ({
          endDate,
        })),

      getSelectedSubQuests: () => {
        const { subQuests, selectedSubQuestIds } = get();
        return subQuests.filter((subQuest) =>
          selectedSubQuestIds.includes(subQuest.id)
        );
      },
      clear: () => {
        set({
          selectedAttribute: null,
          selectedTheme: null,
          selectedMainQuest: null,
          subQuests: [],
          selectedSubQuestIds: [],
          startDate: '',
          endDate: '',
        });
      },
    }),
    {
      name: 'questCreationStore',
      enabled: import.meta.env.DEV,
    }
  )
);
