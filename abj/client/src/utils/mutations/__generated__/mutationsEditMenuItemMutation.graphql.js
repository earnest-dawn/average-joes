/**
 * @generated SignedSource<<4ab3afd3fc87b36aeb855e06b9666a9b>>
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
    "concreteType": "EditMenuItemPayload",
    "kind": "LinkedField",
    "name": "editMenuItems",
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
    "name": "mutationsEditMenuItemMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsEditMenuItemMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "71731af9a49edf231f68a3c4286c6faf",
    "id": null,
    "metadata": {},
    "name": "mutationsEditMenuItemMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsEditMenuItemMutation(\n  $input: EditMenuItemInput!\n) {\n  editMenuItems(input: $input) {\n    code\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "a68ea86e251e23d1dfc6bf49c01c9934";

module.exports = node;
