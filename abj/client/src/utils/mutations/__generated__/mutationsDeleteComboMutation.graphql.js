/**
 * @generated SignedSource<<e3e313a22d321a64110ae7e65161fc7f>>
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
    "concreteType": "DeleteCombosPayload",
    "kind": "LinkedField",
    "name": "deleteCombos",
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
    "name": "mutationsDeleteComboMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsDeleteComboMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c60956d53e1f4014d563e4f99c1aa6c8",
    "id": null,
    "metadata": {},
    "name": "mutationsDeleteComboMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsDeleteComboMutation(\n  $input: DeleteCombosInput!\n) {\n  deleteCombos(input: $input) {\n    code\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "ace000e0c6e17b4bc0540232a2fbeaed";

module.exports = node;
