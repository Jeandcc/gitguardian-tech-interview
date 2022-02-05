import Vue from 'vue';

import RealTimeScans from '@/components/RealTimeScans';

$(() => {
  new Vue({
    components: {
      RealTimeScans,
    },

    data() {
      return {};
    },
  }).$mount('#app');
});
