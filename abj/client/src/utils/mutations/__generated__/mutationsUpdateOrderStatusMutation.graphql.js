/**
 * @generated SignedSource<<5e5922a3e8ae6f7ddc441021a8f01158>>
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
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "OrderType",
        "kind": "LinkedField",
        "name": "order",
        "plural": false,
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
            "name": "status",
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
    "cacheID": "eea280563047c51cf0bfbc4a73111693",
    "id": null,
    "metadata": {},
    "name": "mutationsUpdateOrderStatusMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsUpdateOrderStatusMutation(\n  $input: UpdateOrderStatusInput!\n) {\n  updateOrderStatus(input: $input) {\n    code\n    success\n    message\n    order {\n      id\n      status\n    }\n    clientMutationId\n  }\n}\n"
  }
};
})();

node.hash = "c3e6855b1acc389db58f3b099db1be1a";

export default node;
