import SiteWideVars from '@/services/SiteWideVars';

import VueUtils from '@/util/Vue';

SiteWideVars.replaceVarsInDom();
VueUtils.fixWebflowAttributes();
