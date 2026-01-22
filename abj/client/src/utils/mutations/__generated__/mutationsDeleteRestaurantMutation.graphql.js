/**
 * @generated SignedSource<<e211360d01134634500859b90b94a59e>>
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
    "concreteType": "DeleteRestaurantPayload",
    "kind": "LinkedField",
    "name": "deleteRestaurant",
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
    "name": "mutationsDeleteRestaurantMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsDeleteRestaurantMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6a0d5e1f6088b6eac983a799a2dbe415",
    "id": null,
    "metadata": {},
    "name": "mutationsDeleteRestaurantMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsDeleteRestaurantMutation(\n  $input: DeleteRestaurantInput!\n) {\n  deleteRestaurant(input: $input) {\n    code\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "bb29b2a9e53f650d3153dc16aa207d64";

module.exports = node;
