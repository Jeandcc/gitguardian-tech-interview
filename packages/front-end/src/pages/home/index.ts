import Vue from 'vue';

import WebflowUtils from '@/util/Webflow';

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
    },
  }).$mount('#app');
});
