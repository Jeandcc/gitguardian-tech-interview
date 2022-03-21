/* eslint-disable no-underscore-dangle */

import WebflowAPI from "../src/services/Webflow";

const collectionId = "60264d938561e516e7b56084";

(async () => {
  const items = await WebflowAPI.getAllItemsOfCollection(collectionId);

  await Promise.all(
    items.map((item) =>
      WebflowAPI.updateItem({
        collectionId,
        fields: { "should-show-in-community-page": true },
        itemId: item._id,
        live: false,
      }).then((updatedItem) => {
        console.log(`Updated item ${updatedItem._id}`);
      })
    )
  );
})();
