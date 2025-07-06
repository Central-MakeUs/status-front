import { create } from 'zustand';
import type { Attribute } from '@/types/attribute';
import type { Category } from '@/types/category';

interface QuestCreationState {
  selectedMentalityAttribute: Attribute | null;
  selectedSkillAttribute: Attribute | null;
  selectedCategory: Category | null;
  setSelectedMentalityAttribute: (attribute: Attribute | null) => void;
  setSelectedSkillAttribute: (attribute: Attribute | null) => void;
  setSelectedCategory: (category: Category | null) => void;
}

export const useQuestCreationStore = create<QuestCreationState>()((set) => ({
  selectedMentalityAttribute: null,
  selectedSkillAttribute: null,
  selectedCategory: null,

  setSelectedMentalityAttribute: (attribute) =>
    set(() => ({ selectedMentalityAttribute: attribute })),

  setSelectedSkillAttribute: (attribute) =>
    set(() => ({ selectedSkillAttribute: attribute })),

  setSelectedCategory: (category) =>
    set(() => ({ selectedCategory: category })),
}));
