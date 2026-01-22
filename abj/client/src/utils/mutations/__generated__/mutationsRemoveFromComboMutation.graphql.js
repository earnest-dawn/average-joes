/**
 * @generated SignedSource<<751ac2adc937d29eb72fe1651987276f>>
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
    "concreteType": "RemoveFromCombosPayload",
    "kind": "LinkedField",
    "name": "removeFromCombos",
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
    "name": "mutationsRemoveFromComboMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsRemoveFromComboMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ce9f8e5e0628be3b6ffe2d7cc2dc523d",
    "id": null,
    "metadata": {},
    "name": "mutationsRemoveFromComboMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsRemoveFromComboMutation(\n  $input: RemoveFromCombosInput!\n) {\n  removeFromCombos(input: $input) {\n    code\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "6b53ae56be39e3a1323c20aa8f2451ed";

module.exports = node;
