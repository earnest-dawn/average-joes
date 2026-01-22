/**
 * @generated SignedSource<<bfde92e59f5a214a37b39a21f92f60d4>>
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
    "concreteType": "CreateCombosPayload",
    "kind": "LinkedField",
    "name": "createCombos",
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
    "name": "mutationsCreateComboMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsCreateComboMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4111585dd2a1bcdb202fefecb14a7249",
    "id": null,
    "metadata": {},
    "name": "mutationsCreateComboMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsCreateComboMutation(\n  $input: CreateCombosInput!\n) {\n  createCombos(input: $input) {\n    code\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "cb35ddf3b4050c707114beed7a30fab5";

module.exports = node;
