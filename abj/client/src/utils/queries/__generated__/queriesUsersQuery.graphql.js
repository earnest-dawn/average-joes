/**
 * @generated SignedSource<<d093855d12bb0534598d904e89364cfc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "users",
    "plural": true,
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
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "queriesUsersQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "queriesUsersQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "ee7f5df65527e089ad7c87023eb913f0",
    "id": null,
    "metadata": {},
    "name": "queriesUsersQuery",
    "operationKind": "query",
    "text": "query queriesUsersQuery {\n  users {\n    id\n    username\n    email\n  }\n}\n"
  }
};
})();

node.hash = "e1ccb53a9d9c7b8227d8d5d54bc01044";

module.exports = node;
