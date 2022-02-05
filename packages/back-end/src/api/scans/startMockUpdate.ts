import { https } from "firebase-functions";
import { faker } from "@faker-js/faker";

import { increment } from "@services/firebase";

import { dbCollections, dbDocs } from "@models/db";

import WaitUtils from "@util/Wait";
import ArrayUtils from "@util/Arrays";

import { NsScans } from "@gitguardian-tech-interview/types";

let startedUpdate = false;

// eslint-disable-next-line no-underscore-dangle
export default https._onCallWithOptions(
  async () => {
    if (startedUpdate) return;
    startedUpdate = true;

    const possibleSecretTypes: NsScans.TSecretType[] = [
      "AWS Credential Key",
      "Django configuration file",
      "Environment configuration file",
      "Github Key",
      "Google OAuth Key",
      "SSH Key",
      "Username and password in URI",
    ];

    // We want to stay under Firebase's free-tier, so we'll delete
    // items that are older than 1 hour
    /*
    const deleteMocksInExcess = async () => {
      const snap = await dbCollections
        .secretsFound()
        .orderBy("time")
        .endBefore(Date.now() - 1000 * 60 * 60)
        .get();

      snap.docs.forEach((d) => {
        FireUtil.addBatchOperation("delete", d.ref);
      });

      await FireUtil.runBatchOperations();
    };
    */

    const addMockScannedSecret = async () => {
      await Promise.all([
        dbCollections.secretsFound().add({
          commitMessage: faker.git.commitMessage(),
          secretType: ArrayUtils.pickRandomItem(possibleSecretTypes),
          time: Date.now(),
        }),
        dbDocs.scanningStats().update({
          filesProcessed: increment(Math.ceil(Math.random() * 30)),
          mbSizeOfCodeScanned: increment(Math.ceil(Math.random() * 3)),
          repositoriesSearched:
            Math.random() > 0.66 ? increment(1) : increment(0),
          secretsFound: increment(1),
        }),
        // deleteMocksInExcess(), // Disabling because reading &
        // deleting is more expensive than just leaving it there
      ]);

      setTimeout(
        () => addMockScannedSecret(),
        Math.random() * 5 * 1000 // Add new secret in 0 to 5 seconds
      );
    };

    addMockScannedSecret();

    await WaitUtils.sleep(540 * 1000); // We want to keep this function running until the request timeouts
  },
  { timeoutSeconds: 540 }
);
