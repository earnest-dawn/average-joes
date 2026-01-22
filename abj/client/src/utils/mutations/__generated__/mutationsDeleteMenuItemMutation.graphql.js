/**
 * @generated SignedSource<<6832a7b989f66a981677b97f586c5367>>
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
    "concreteType": "DeleteMenuItemPayload",
    "kind": "LinkedField",
    "name": "deleteMenuItems",
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
    "name": "mutationsDeleteMenuItemMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsDeleteMenuItemMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4c642e1303dee44164114102ac544e40",
    "id": null,
    "metadata": {},
    "name": "mutationsDeleteMenuItemMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsDeleteMenuItemMutation(\n  $input: DeleteMenuItemInput!\n) {\n  deleteMenuItems(input: $input) {\n    code\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "6bbf5b151c6e193fae7fb5f80b273ead";

module.exports = node;
