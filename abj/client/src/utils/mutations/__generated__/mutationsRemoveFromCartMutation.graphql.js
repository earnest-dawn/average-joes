/**
 * @generated SignedSource<<17847a2297f5d6db51c8bfed9aa97f50>>
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
    "concreteType": "RemoveFromCartPayload",
    "kind": "LinkedField",
    "name": "removeFromCart",
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
        "concreteType": "CartType",
        "kind": "LinkedField",
        "name": "cart",
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
            "name": "totalPrice",
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
    "name": "mutationsRemoveFromCartMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsRemoveFromCartMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b200b24e1b7575d56c4b0fb930e13968",
    "id": null,
    "metadata": {},
    "name": "mutationsRemoveFromCartMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsRemoveFromCartMutation(\n  $input: RemoveFromCartInput!\n) {\n  removeFromCart(input: $input) {\n    code\n    success\n    message\n    cart {\n      id\n      totalPrice\n    }\n    clientMutationId\n  }\n}\n"
  }
};
})();

node.hash = "b6f395e0a535cefcb3690550bbdf709d";

export default node;
