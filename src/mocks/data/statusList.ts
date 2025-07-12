import type { StatusList } from '@/types/status';

export const mockStatusMap: Record<string, StatusList> = {
  '1': {
    statusDataList: [
      [60, 60, 80, 60, 60, 65],
      [75, 75, 65, 70, 60, 75],
    ],
    growthStatusList: [
      [1, 0, 0, -1, 0, 0],
      [1, 1, -1, 0, 0, -1],
    ],
  },
  '2': {
    statusDataList: [
      [55, 62, 70, 65, 68, 60],
      [70, 72, 67, 68, 65, 72],
    ],
    growthStatusList: [
      [0, 1, 1, 0, -1, 0],
      [-1, 1, 0, 0, 1, 0],
    ],
  },
  '3': {
    statusDataList: [
      [68, 58, 75, 70, 66, 69],
      [78, 60, 70, 73, 68, 74],
    ],
    growthStatusList: [
      [0, 0, 1, 1, 0, -1],
      [1, 0, 0, 0, -1, 1],
    ],
  },
  '4': {
    statusDataList: [
      [50, 55, 60, 58, 62, 57],
      [60, 58, 64, 60, 59, 61],
    ],
    growthStatusList: [
      [-1, 0, 0, 0, 1, 0],
      [0, -1, 1, 1, 0, 0],
    ],
  },
  '5': {
    statusDataList: [
      [65, 62, 70, 66, 64, 63],
      [72, 70, 68, 69, 67, 71],
    ],
    growthStatusList: [
      [0, 1, 0, -1, 1, 0],
      [1, 0, -1, 1, 0, 1],
    ],
  },
  '6': {
    statusDataList: [
      [58, 59, 60, 62, 61, 60],
      [63, 65, 66, 64, 62, 66],
    ],
    growthStatusList: [
      [0, 0, 1, 0, -1, 0],
      [-1, 1, 1, 0, 0, -1],
    ],
  },
  '7': {
    statusDataList: [
      [70, 68, 72, 69, 71, 70],
      [75, 74, 73, 76, 72, 75],
    ],
    growthStatusList: [
      [1, 0, 0, 1, 0, -1],
      [0, 1, 0, 0, 1, 0],
    ],
  },
  '8': {
    statusDataList: [
      [62, 64, 63, 65, 66, 64],
      [68, 70, 69, 67, 66, 69],
    ],
    growthStatusList: [
      [-1, 1, 0, 0, 1, 1],
      [1, 0, -1, 1, 0, 0],
    ],
  },
  '9': {
    statusDataList: [
      [59, 61, 60, 62, 63, 60],
      [65, 67, 66, 64, 62, 66],
    ],
    growthStatusList: [
      [0, -1, 1, 0, 0, 1],
      [1, 1, 0, -1, 0, 0],
    ],
  },
  '10': {
    statusDataList: [
      [66, 68, 70, 67, 65, 69],
      [72, 74, 73, 71, 70, 72],
    ],
    growthStatusList: [
      [1, 0, -1, 1, 0, 0],
      [0, 1, 1, 0, -1, 1],
    ],
  },
};
