/**
 * @generated SignedSource<<e86441b51808005a3dfe0859417fe410>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "Restaurant"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "items"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "Restaurant",
        "variableName": "Restaurant"
      },
      {
        "kind": "Variable",
        "name": "items",
        "variableName": "items"
      }
    ],
    "concreteType": "Order",
    "kind": "LinkedField",
    "name": "createOrder",
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "mutationsCreateOrderMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "mutationsCreateOrderMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "58284425eef07cc1e7ea2465e707f12c",
    "id": null,
    "metadata": {},
    "name": "mutationsCreateOrderMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsCreateOrderMutation(\n  $items: [OrderItemInput]!\n  $Restaurant: ID!\n) {\n  createOrder(Restaurant: $Restaurant, items: $items) {\n    id\n    totalPrice\n    status\n  }\n}\n"
  }
};
})();

node.hash = "23fde06d306dd2addf32086bcebfc75b";

module.exports = node;
