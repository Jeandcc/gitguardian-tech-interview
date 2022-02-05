import { https } from "firebase-functions";
import { faker } from "@faker-js/faker";

import { increment } from "@services/firebase";

import { dbCollections, dbDocs } from "@models/db";

import WaitUtils from "@util/Wait";
import ArrayUtils from "@util/Arrays";
import FireUtil from "@util/Firebase";

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
    // items that are not the top 100 most recent "scans".
    const deleteMocksInExcess = async () => {
      const snap = await dbCollections
        .secretsFound()
        .orderBy("time")
        .startAt(20)
        .get();

      snap.docs.forEach((d) => {
        FireUtil.addBatchOperation("delete", d.ref);
      });

      await FireUtil.runBatchOperations();
    };

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
          repositoriesSearched: increment(1),
          secretsFound: increment(1),
        }),
        deleteMocksInExcess(),
      ]);

      setTimeout(
        () => addMockScannedSecret(),
        Math.random() * 15 * 1000 // Add new secret in 0 to 15 seconds
      );
    };

    addMockScannedSecret();

    await WaitUtils.sleep(540 * 1000); // We want to keep this function running until the request timeouts
  },
  { timeoutSeconds: 540 }
);
