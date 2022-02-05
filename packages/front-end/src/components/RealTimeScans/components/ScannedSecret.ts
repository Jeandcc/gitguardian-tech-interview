import Vue, { PropType } from 'vue';
import { formatDistanceToNow } from 'date-fns';

import { NsScans } from '@gitguardian-tech-interview/types';

export default Vue.component('scanned-secret', {
  props: {
    scannedSecret: { type: Object as PropType<NsScans.IScannedSecret> },
  },

  computed: {
    timeAgo(): string {
      return formatDistanceToNow(this.scannedSecret.time, { addSuffix: true });
    },
  },

  template: $("[data-v-template='scanned-secret']").prop('outerHTML'),
});
