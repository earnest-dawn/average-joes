/**
 * @generated SignedSource<<17e3e45fb82acb75456d3806bf622ba0>>
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
    "concreteType": "AddMenuItemPayload",
    "kind": "LinkedField",
    "name": "addMenuItems",
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
    "name": "mutationsAddMenuItemMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsAddMenuItemMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5e64841ba55f68b096a3363acb62f6fb",
    "id": null,
    "metadata": {},
    "name": "mutationsAddMenuItemMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsAddMenuItemMutation(\n  $input: AddMenuItemInput!\n) {\n  addMenuItems(input: $input) {\n    code\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "76e1a568204bb25a57d0c21fd3be6447";

module.exports = node;
