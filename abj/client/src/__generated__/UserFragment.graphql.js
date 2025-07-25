/**
 * @generated SignedSource<<4e926ad77672cab03bacbd8e11d4fa97>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
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
  "type": "User",
  "abstractKey": null
};

node.hash = "94d8ff813a2401eabbd0bd732f57050f";

module.exports = node;
