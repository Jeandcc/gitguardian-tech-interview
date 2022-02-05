/* eslint-disable import/prefer-default-export */
/* eslint-disable import/first */

import * as admin from "firebase-admin";

if (admin.apps.length === 0) admin.initializeApp();

import scans from "@api/scans";

export { scans };
