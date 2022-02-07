import Vue from 'vue';
import { firestorePlugin } from 'vuefire';

import { dbCollections, dbDocs } from '@/models/db';

import BackendFunctions from '@/util/BackendFunctions';

import { NsScans } from '@gitguardian-tech-interview/types';

import ScannedSecret from './components/ScannedSecret';

Vue.use(firestorePlugin);

export default Vue.component('real-time-scans', {
  components: { ScannedSecret },

  data() {
    return {
      recentlyScannedSecrets: <NsScans.IScannedSecret[]>[],
      scanningStats: <NsScans.IScanningStats | null>null,
    };
  },

  created() {
    BackendFunctions.scans.startMockUpdate({});

    this.$bind(
      'recentlyScannedSecrets',
      dbCollections.secretsFound().limit(10).orderBy('time', 'desc'),
    );

    this.$bind('scanningStats', dbDocs.scanningStats() as any);
  },

  computed: {
    secretsFound(): string {
      return `${this.scanningStats?.secretsFound.toLocaleString()}+`;
    },
    repositoriesSearched(): string {
      return `${this.scanningStats?.repositoriesSearched.toLocaleString()}+`;
    },
    filesProcessed(): string {
      return `${this.scanningStats?.filesProcessed.toLocaleString()}+`;
    },
    mbSizeOfCodeScanned(): string {
      return `${this.scanningStats?.mbSizeOfCodeScanned.toLocaleString()}MB+`;
    },
  },

  template: $("[data-v-template='real-time-scans']").prop('outerHTML'),
});
