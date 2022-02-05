/**
 * To understand why our "database" is structured this way, see:
 *  - https://medium.com/swlh/using-firestore-with-typescript-65bd2a602945
 */

import {
  collectionConverter,
  collectionGroupConverter,
} from "@util/firestoreConverters";

import {
  NsSiteActivities,
  NsUserNotifications,
  NsUser,
} from "@gitguardian-tech-interview/types";

export const dbCollections = {
  users: () => collectionConverter<NsUser.IUser>("users"),
  userNotifications: (userId: string) =>
    collectionConverter<NsUserNotifications.INotification>(
      `users/${userId}/notifications`
    ),
};

export const dbGroups = {
  notifications:
    collectionGroupConverter<NsUserNotifications.INotification>(
      "notifications"
    ),
  activities:
    collectionGroupConverter<NsSiteActivities.IActivity>("activities"),
};
