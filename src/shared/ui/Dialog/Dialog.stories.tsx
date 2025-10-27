import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/shared/ui/button/button';
import { Dialog } from '@/shared/ui/dialog/dialog';

const meta = {
  title: 'molecules/Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        story: '페이지 전환 시 로딩 표시',
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConfirmDialog: Story = {
  args: {
    children: (
      <>
        <Dialog.Title>퀘스트를 포기할까요?</Dialog.Title>
        <Dialog.Description>
          삭제된 퀘스트는 되돌릴 수 없으며
          <br />
          중도 포기 시 보상을 받을 수 없습니다.
        </Dialog.Description>
        <Dialog.Actions>
          <Button variant="primary">취소</Button>
          <Button variant="secondary">포기하기</Button>
        </Dialog.Actions>
      </>
    ),
  },
};

export const AlertDialog: Story = {
  args: {
    children: (
      <>
        <Dialog.Title>퀘스트를 포기할까요?</Dialog.Title>
        <Dialog.Description>
          삭제된 퀘스트는 되돌릴 수 없으며
          <br />
          중도 포기 시 보상을 받을 수 없습니다.
        </Dialog.Description>
        <Dialog.Actions>
          <Button variant="primary">확인</Button>
        </Dialog.Actions>
      </>
    ),
  },
};
