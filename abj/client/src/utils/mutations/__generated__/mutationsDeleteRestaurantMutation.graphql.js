/**
 * @generated SignedSource<<05224e2bbc934025a807175f72d707cd>>
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
    "concreteType": "DeleteRestaurantPayload",
    "kind": "LinkedField",
    "name": "deleteRestaurant",
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
        "concreteType": "RestaurantType",
        "kind": "LinkedField",
        "name": "restaurant",
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
    "name": "mutationsDeleteRestaurantMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsDeleteRestaurantMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a41adf1250b640f0682a35671d69f030",
    "id": null,
    "metadata": {},
    "name": "mutationsDeleteRestaurantMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsDeleteRestaurantMutation(\n  $input: DeleteRestaurantInput!\n) {\n  deleteRestaurant(input: $input) {\n    code\n    success\n    message\n    restaurant {\n      id\n      name\n    }\n    clientMutationId\n  }\n}\n"
  }
};
})();

node.hash = "ced1bb8267927cbdaad093e51b3d2982";

export default node;
