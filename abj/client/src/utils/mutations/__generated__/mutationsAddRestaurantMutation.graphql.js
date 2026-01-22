/**
 * @generated SignedSource<<8ee5d6ca15a7bc4e6371e5af671c8c63>>
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
    "concreteType": "AddRestaurantPayload",
    "kind": "LinkedField",
    "name": "addRestaurant",
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
    "name": "mutationsAddRestaurantMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsAddRestaurantMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b9721adc82024b707104172b4e9fb547",
    "id": null,
    "metadata": {},
    "name": "mutationsAddRestaurantMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsAddRestaurantMutation(\n  $input: AddRestaurantInput!\n) {\n  addRestaurant(input: $input) {\n    code\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "b961c2f495ee18a2c4953dcf12963aa1";

module.exports = node;
