/**
 * @generated SignedSource<<f1af905c5a29189806810fe06d553440>>
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
    "concreteType": "EditCombosPayload",
    "kind": "LinkedField",
    "name": "editCombos",
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
    "name": "mutationsEditComboMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsEditComboMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "604a24539f6e3014cf17ecd5b385fb04",
    "id": null,
    "metadata": {},
    "name": "mutationsEditComboMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsEditComboMutation(\n  $input: EditCombosInput!\n) {\n  editCombos(input: $input) {\n    code\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "c35fd42dd8839307549b098b00482928";

module.exports = node;
