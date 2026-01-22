/**
 * @generated SignedSource<<e194908d096abb14d0d2d6ef7473d625>>
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
    "concreteType": "ToggleStockStatusPayload",
    "kind": "LinkedField",
    "name": "toggleStockStatus",
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
        "concreteType": "MenuItems",
        "kind": "LinkedField",
        "name": "menuItem",
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
            "name": "inStock",
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
    "name": "mutationsToggleStockStatusMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsToggleStockStatusMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d99f3af6b2727180a713f9f09c0d79ef",
    "id": null,
    "metadata": {},
    "name": "mutationsToggleStockStatusMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsToggleStockStatusMutation(\n  $input: ToggleStockStatusInput!\n) {\n  toggleStockStatus(input: $input) {\n    code\n    success\n    message\n    menuItem {\n      id\n      inStock\n    }\n  }\n}\n"
  }
};
})();

node.hash = "b5e3b9967e1a4db2d953dbd7055b2c36";

module.exports = node;
