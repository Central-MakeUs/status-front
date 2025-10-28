import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { PAGE_PATHS } from '@/shared/config/paths';
import { useGetMainQuests } from '@/entities/quest-template/api/use-get-main-quests';
import { useGetRandomMainQuests } from '@/entities/quest-template/api/use-get-random-main-quests';
import { Header } from '@/widgets/global-header/ui/header';
import { useQuestCreationStore } from '@/features/create-quest/model/create-quest-store';
import { StepTitle } from '@/features/create-quest/ui/step-title/step-title';
import { StepActions } from '@/features/create-quest/ui/step-actions/step-actions';
import { StepDescription } from '@/features/create-quest/ui/step-description/step-description';
import { StepRadioGroupSkeleton } from '@/features/create-quest/ui/step-radio-group/step-radio-group-skeleton';
import { StepRadioGroup } from '@/features/create-quest/ui/step-radio-group/step-radio-group';
import { StepRefreshButton } from '@/features/create-quest/ui/step-refresh-button/step-refresh-button';

import IconLogo from '@/assets/icons/icon-logo-default.svg?react';

export const StepMainQuestPage = () => {
  const navigate = useNavigate();
  const {
    selectedAttribute,
    selectedTheme,
    selectedMainQuest,
    setSelectedMainQuest,
  } = useQuestCreationStore(
    useShallow((state) => ({
      selectedAttribute: state.selectedAttribute,
      selectedTheme: state.selectedTheme,
      selectedMainQuest: state.selectedMainQuest,
      setSelectedMainQuest: state.setSelectedMainQuest,
    }))
  );

  useEffect(() => {
    if (!selectedTheme) {
      navigate(PAGE_PATHS.QUEST_NEW_THEME, { replace: true });
    }
  }, [selectedTheme, navigate]);

  const selectedAttributeIds = useMemo(
    () => selectedAttribute?.attributeId ?? 0,
    [selectedAttribute]
  );

  const selectedThemeId = useMemo(
    () => selectedTheme?.id ?? 0,
    [selectedTheme]
  );

  const { data, isLoading, isRefetching } = useGetMainQuests({
    attributes: [selectedAttributeIds],
    theme: selectedThemeId,
  });

  const currentMainQuestIds = data?.map((quest) => quest.id) ?? [];

  const { refreshMainQuests } = useGetRandomMainQuests();

  const handleClickRefreshButton = () => {
    setSelectedMainQuest(null);
    refreshMainQuests({
      attributes: [selectedAttributeIds],
      theme: selectedThemeId,
      mainQuests: currentMainQuestIds,
    });
  };

  const handleClickNextButton = () => {
    if (!selectedMainQuest) {
      return;
    }

    navigate(PAGE_PATHS.QUEST_NEW_SUB_QUEST);
  };

  return (
    <>
      <Header>
        <Header.Title>퀘스트 만들기</Header.Title>
        <Header.BackButton />
      </Header>
      <main className="main">
        <StepTitle logo={<IconLogo />}>메인 퀘스트를 선택해주세요!</StepTitle>
        {selectedTheme && (
          <StepDescription>
            {selectedTheme?.name}에 맞는 메인 퀘스트를 추천해드렸어요.
          </StepDescription>
        )}
        {isLoading || isRefetching ? (
          <StepRadioGroupSkeleton />
        ) : (
          <StepRadioGroup
            label="메인 퀘스트 선택"
            data={data}
            value={selectedMainQuest}
            onClick={setSelectedMainQuest}
          />
        )}
        <StepRefreshButton
          onClick={handleClickRefreshButton}
          isLoading={isLoading || isRefetching}
        />
      </main>
      <StepActions
        disabled={!selectedMainQuest}
        onClick={handleClickNextButton}
      >
        다음
      </StepActions>
    </>
  );
};

export default StepMainQuestPage;
