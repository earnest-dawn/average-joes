/**
 * @generated SignedSource<<1bc207a400ec8fe092a4eff66770c6d4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OrderOnlinePageFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MenuItems",
      "kind": "LinkedField",
      "name": "menuItems",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MenuItemsFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Rating",
      "kind": "LinkedField",
      "name": "ratings",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "RatingFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Friend",
      "kind": "LinkedField",
      "name": "friends",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FriendFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

node.hash = "a3c6fa703c6e3917f2725bd144ab84ac";

module.exports = node;
