/**
 * @generated SignedSource<<1df96369b58c6bc5751c5d2454e246f9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ClaimRestaurantOwnershipPayload",
    "kind": "LinkedField",
    "name": "claimRestaurantOwnership",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "code",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "success",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "message",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "RestaurantType",
        "kind": "LinkedField",
        "name": "restaurant",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "owner",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "username",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "clientMutationId",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "mutationsClaimRestaurantOwnershipMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsClaimRestaurantOwnershipMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "7a9ea72ef609e3b8a2aa9026b909c9c3",
    "id": null,
    "metadata": {},
    "name": "mutationsClaimRestaurantOwnershipMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsClaimRestaurantOwnershipMutation(\n  $input: ClaimRestaurantOwnershipInput!\n) {\n  claimRestaurantOwnership(input: $input) {\n    code\n    success\n    message\n    restaurant {\n      id\n      name\n      owner {\n        id\n        username\n      }\n    }\n    clientMutationId\n  }\n}\n"
  }
};
})();

node.hash = "ab23c13a087a2124977de9f6b7f763ec";

export default node;
