/**
 * @generated SignedSource<<bcf1d65670929b60a5f2cb90f81f3e9c>>
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
    "concreteType": "CreateMenuItemPayload",
    "kind": "LinkedField",
    "name": "createMenuItems",
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
    "name": "mutationsCreateMenuItemMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsCreateMenuItemMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c70e14577bd85ca1564d9a44e27b6ed4",
    "id": null,
    "metadata": {},
    "name": "mutationsCreateMenuItemMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsCreateMenuItemMutation(\n  $input: CreateMenuItemInput!\n) {\n  createMenuItems(input: $input) {\n    code\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "fefbcca8165230acf5a3621b213b9025";

module.exports = node;
