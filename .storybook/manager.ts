// .storybook/manager.ts
import { addons } from 'storybook/manager-api';

import { themes } from 'storybook/theming';

addons.setConfig({
  theme: {
    ...themes.dark,
    appPreviewBg: '#161616',
  },
});
