/**
 * @generated SignedSource<<a54b9e90dca127bd5844170e97d2c155>>
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
    "concreteType": "CreateRestaurantPayload",
    "kind": "LinkedField",
    "name": "createRestaurant",
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
    "name": "mutationsCreateRestaurantMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsCreateRestaurantMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8e448aca03962a800a8b0270d2dd94af",
    "id": null,
    "metadata": {},
    "name": "mutationsCreateRestaurantMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsCreateRestaurantMutation(\n  $input: CreateRestaurantInput!\n) {\n  createRestaurant(input: $input) {\n    code\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "3a20cf9f5f948aad6ca2917e0fa94fe1";

module.exports = node;
