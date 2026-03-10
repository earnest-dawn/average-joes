/**
 * @generated SignedSource<<3d8b8345372d9f0b98ed8ca0e44dc130>>
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
            "name": "description",
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
    "name": "mutationsEditCombosMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsEditCombosMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8f150b2ab1da4f617dd861d161fa34ff",
    "id": null,
    "metadata": {},
    "name": "mutationsEditCombosMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsEditCombosMutation(\n  $input: EditCombosInput!\n) {\n  editCombos(input: $input) {\n    code\n    success\n    message\n    combos {\n      id\n      title\n      price\n      description\n    }\n    clientMutationId\n  }\n}\n"
  }
};
})();

node.hash = "60d231ee8c0fcaeac93bcfb9edb67db3";

export default node;
