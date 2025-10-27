import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useGetThemes } from '@/entities/quest/api/use-get-themes';
import { useQuestCreationStore } from './model/quest-creation-store';
import { PAGE_PATHS } from '@/app/providers/paths';
import { Header } from '@/widgets/global-header/ui/header';
import { StepTitle } from './ui/step-title/step-title';
import { StepActions } from './ui/step-actions/step-actions';
import { StepDescription } from './ui/step-description/step-description';
import { StepRadioGroupSkeleton } from './ui/step-radio-group/step-radio-group-skeleton';
import { StepRadioGroup } from './ui/step-radio-group/step-radio-group';
import { StepRefreshButton } from './ui/step-refresh-button/step-refresh-button';
import { useGetRandomThemes } from '@/entities/quest/api/use-get-random-themes';

export const StepCategoryPage = () => {
  const navigate = useNavigate();
  const { selectedAttribute, selectedTheme, setSelectedTheme } =
    useQuestCreationStore(
      useShallow((state) => ({
        selectedAttribute: state.selectedAttribute,
        selectedTheme: state.selectedTheme,
        setSelectedTheme: state.setSelectedTheme,
      }))
    );

  const isValidAttributes = selectedAttribute !== null;

  useEffect(() => {
    if (!isValidAttributes) {
      navigate(PAGE_PATHS.QUEST_NEW_ATTRIBUTE, { replace: true });
    }
  }, [isValidAttributes, navigate]);

  const attributeNames = useMemo(
    () => selectedAttribute?.name ?? '',
    [selectedAttribute]
  );

  const selectedAttributeIds = useMemo(
    () => selectedAttribute?.attributeId ?? 0,
    [selectedAttribute]
  );

  const { data, isLoading, isRefetching } = useGetThemes({
    attributes: [selectedAttributeIds],
  });

  const currentThemeIds = data?.map((theme) => theme.id) ?? [];

  const { refreshThemes } = useGetRandomThemes();

  const handleClickRefreshButton = () => {
    setSelectedTheme(null);

    refreshThemes({
      attributes: [selectedAttributeIds],
      themes: currentThemeIds,
    });
  };

  const handleClickNextButton = () => {
    if (!selectedTheme) {
      return;
    }

    navigate(PAGE_PATHS.QUEST_NEW_MAIN_QUEST);
  };

  return (
    <>
      <Header>
        <Header.Title>퀘스트 만들기</Header.Title>
        <Header.BackButton />
      </Header>
      <main className="main">
        <StepTitle>시도하고 싶은 테마를 선택하세요!</StepTitle>
        <StepDescription>
          {attributeNames}을(를) 성장시킬 수 있는 테마를 추천해드렸어요
        </StepDescription>

        {isLoading || isRefetching ? (
          <StepRadioGroupSkeleton />
        ) : (
          <StepRadioGroup
            label="카테고리 선택"
            data={data}
            value={selectedTheme}
            onClick={setSelectedTheme}
          />
        )}

        <StepRefreshButton
          onClick={handleClickRefreshButton}
          isLoading={isLoading || isRefetching}
        />
      </main>
      <StepActions disabled={!selectedTheme} onClick={handleClickNextButton}>
        다음
      </StepActions>
    </>
  );
};

export default StepCategoryPage;
