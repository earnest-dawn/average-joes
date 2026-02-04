/**
 * @generated SignedSource<<118111a9ac11df016b7f23d8c3175a90>>
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
    "concreteType": "UpdateOrderStatusPayload",
    "kind": "LinkedField",
    "name": "updateOrderStatus",
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
    "name": "mutationsUpdateOrderStatusMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsUpdateOrderStatusMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "46f757d1263eec882f61e35904ccdc85",
    "id": null,
    "metadata": {},
    "name": "mutationsUpdateOrderStatusMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsUpdateOrderStatusMutation(\n  $input: UpdateOrderStatusInput!\n) {\n  updateOrderStatus(input: $input) {\n    code\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "2d9d650b38c9921c531127a2d6529d2f";

module.exports = node;
