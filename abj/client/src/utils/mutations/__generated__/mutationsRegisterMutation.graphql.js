/**
 * @generated SignedSource<<8ef4739b88ff82fdb0544782ece5b19f>>
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
    "concreteType": "RegisterPayload",
    "kind": "LinkedField",
    "name": "register",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "username",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "password",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
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
    "name": "mutationsRegisterMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsRegisterMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f61cf3081ff592d16559abe1d29c72a1",
    "id": null,
    "metadata": {},
    "name": "mutationsRegisterMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsRegisterMutation(\n  $input: RegisterInput!\n) {\n  register(input: $input) {\n    token\n    user {\n      username\n      password\n      email\n      id\n    }\n  }\n}\n"
  }
};
})();

node.hash = "b3f66bc18ff12e87dff0988e1bc72782";

module.exports = node;
