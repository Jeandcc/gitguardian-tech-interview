import Vue from 'vue';

import WebflowUtils from '@/util/Webflow';

import AnimatedTabMenuIndicator from '@/components/AnimatedTabMenuIndicator';
import RealTimeScans from '@/components/RealTimeScans';

$(() => {
  new Vue({
    components: {
      RealTimeScans,
    },

    data() {
      return {};
    },

    mounted() {
      WebflowUtils.restartIX2();

      new AnimatedTabMenuIndicator('.detection-remediation__tab-menu');
    },
  }).$mount('#app');
});
