/**
 * @generated SignedSource<<74a58f9e26318d07feabd1b370bd3d76>>
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
            "name": "name",
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
    "name": "mutationsDeleteMenuItemsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsDeleteMenuItemsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4e5d6abb4b77bc35672fd52dad874e4d",
    "id": null,
    "metadata": {},
    "name": "mutationsDeleteMenuItemsMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsDeleteMenuItemsMutation(\n  $input: DeleteMenuItemInput!\n) {\n  deleteMenuItems(input: $input) {\n    code\n    success\n    message\n    menuItem {\n      id\n      name\n    }\n    clientMutationId\n  }\n}\n"
  }
};
})();

node.hash = "0f4fea1b6c5173c1ade39dc64e6e6df1";

export default node;
