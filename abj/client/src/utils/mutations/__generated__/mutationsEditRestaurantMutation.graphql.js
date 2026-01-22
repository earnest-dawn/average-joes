/**
 * @generated SignedSource<<5db07023398027fa2eac65dbb03e235d>>
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
    "concreteType": "EditRestaurantPayload",
    "kind": "LinkedField",
    "name": "editRestaurant",
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
    "name": "mutationsEditRestaurantMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsEditRestaurantMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e8c71a6c1c0632aa08b80b871a2b46a9",
    "id": null,
    "metadata": {},
    "name": "mutationsEditRestaurantMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsEditRestaurantMutation(\n  $input: EditRestaurantInput!\n) {\n  editRestaurant(input: $input) {\n    code\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "3bf8f46abd65c508757924d445ed3861";

module.exports = node;
