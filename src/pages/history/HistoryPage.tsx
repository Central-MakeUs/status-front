import { Header } from '@/components/ui/Header/Header';
import { ComingSoonPage } from '../errors/ComingSoonPage';

export const HistoryPage = () => {
  return (
    <>
      <Header>
        <Header.Title>히스토리</Header.Title>
      </Header>
      <ComingSoonPage />
    </>
  );
};

export default HistoryPage;
