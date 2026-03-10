/**
 * @generated SignedSource<<ac8b998c54fe3f38953b600e62d3efed>>
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
    "concreteType": "DeleteOrderPayload",
    "kind": "LinkedField",
    "name": "deleteOrder",
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
    "name": "mutationsDeleteOrderMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsDeleteOrderMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6229c1a6848bb7d09e2fdc6f6054f730",
    "id": null,
    "metadata": {},
    "name": "mutationsDeleteOrderMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsDeleteOrderMutation(\n  $input: DeleteOrderInput!\n) {\n  deleteOrder(input: $input) {\n    code\n    success\n    message\n    order {\n      id\n    }\n    clientMutationId\n  }\n}\n"
  }
};
})();

node.hash = "af046c8c1ff735222b6f06a6eefaba34";

export default node;
