/**
 * @generated SignedSource<<3f533291d8f1546ac6d78625160c6226>>
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
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Combos",
        "kind": "LinkedField",
        "name": "combos",
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
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "price",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "originalPrice",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "clientMutationId",
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
    "name": "mutationsCreateCombosMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsCreateCombosMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ffac7791f8c14941d450162751c5e6da",
    "id": null,
    "metadata": {},
    "name": "mutationsCreateCombosMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsCreateCombosMutation(\n  $input: CreateCombosInput!\n) {\n  createCombos(input: $input) {\n    code\n    success\n    message\n    combos {\n      id\n      title\n      price\n      originalPrice\n    }\n    clientMutationId\n  }\n}\n"
  }
};
})();

node.hash = "20ead65a6ec280e1f31fca8231a7da65";

export default node;
