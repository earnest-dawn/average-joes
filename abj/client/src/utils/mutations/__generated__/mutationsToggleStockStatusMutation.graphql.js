/**
 * @generated SignedSource<<42ee7fbf0c746118c1019238eaa89b5a>>
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
    "concreteType": "ToggleStockStatusPayload",
    "kind": "LinkedField",
    "name": "toggleStockStatus",
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
        "concreteType": "MenuItems",
        "kind": "LinkedField",
        "name": "menuItem",
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
            "name": "inStock",
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
    "name": "mutationsToggleStockStatusMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsToggleStockStatusMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a24833717d65b458ffde3aa342b5e7ae",
    "id": null,
    "metadata": {},
    "name": "mutationsToggleStockStatusMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsToggleStockStatusMutation(\n  $input: ToggleStockStatusInput!\n) {\n  toggleStockStatus(input: $input) {\n    code\n    success\n    message\n    menuItem {\n      id\n      inStock\n    }\n    clientMutationId\n  }\n}\n"
  }
};
})();

node.hash = "d75a05502fb50e8617d0ba6f67a0b9f4";

export default node;
