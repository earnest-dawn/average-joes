/**
 * @generated SignedSource<<85137fbb9bfa3f13968405ec826d1773>>
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
v1 = [
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
    "name": "mutationsClaimOwnershipMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsClaimOwnershipMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f90a3f9b53336a1d869b02504f087c47",
    "id": null,
    "metadata": {},
    "name": "mutationsClaimOwnershipMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsClaimOwnershipMutation(\n  $input: ClaimRestaurantOwnershipInput!\n) {\n  claimRestaurantOwnership(input: $input) {\n    code\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "aa093ea21c3e95196e025f49cb4c6c70";

module.exports = node;
