import { withInstall } from '/@/utils';

import footer from './src/PageFooter.vue';
import wrapper from './src/PageWrapper.vue';

export const PageFooter = withInstall(footer);
export const PageWrapper = withInstall(wrapper);

export const PageWrapperFixedHeightKey = 'PageWrapperFixedHeight';
