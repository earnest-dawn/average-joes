/**
 * @generated SignedSource<<15b8cd9758790b22bfeac8749a676d0f>>
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
    "concreteType": "AddToCombosPayload",
    "kind": "LinkedField",
    "name": "addToCombos",
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
    "name": "mutationsAddToComboMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsAddToComboMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "73a83aef775a4da2fed0a092798ff04c",
    "id": null,
    "metadata": {},
    "name": "mutationsAddToComboMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsAddToComboMutation(\n  $input: AddToCombosInput!\n) {\n  addToCombos(input: $input) {\n    code\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "0c1ae6283b4ad63d77d0d2bf8ca1a6af";

module.exports = node;
