/**
 * @generated SignedSource<<c049a6e90fb93a5ec4cd3c7b36264849>>
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
        "concreteType": "Order",
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
    "name": "mutationsDeleteBadOrderMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsDeleteBadOrderMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3e66f969f13189282805dff7ac914002",
    "id": null,
    "metadata": {},
    "name": "mutationsDeleteBadOrderMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsDeleteBadOrderMutation(\n  $input: DeleteOrderInput!\n) {\n  deleteOrder(input: $input) {\n    code\n    success\n    message\n    order {\n      id\n    }\n  }\n}\n"
  }
};
})();

node.hash = "239f85add53b70cf5e50fd8a55785def";

module.exports = node;
