import { FireFunctions } from '@/services/firebase';

// import { NsApiRequests } from '@gitguardian-tech-interview/types';

const getTypedHttpFunc = <IReq, IRes>(funcName: string) => {
  interface ITypedHttpFunc extends firebase.default.functions.HttpsCallable {
    (data: IReq): Promise<{ data: IRes }>;
  }

  const typedFunc: ITypedHttpFunc = FireFunctions.httpsCallable(funcName);
  return typedFunc;
};

export default {
  scans: {
    startMockUpdate: getTypedHttpFunc<{}, {}>('scans-startMockUpdate'),
  },
};
