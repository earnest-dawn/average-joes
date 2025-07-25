/**
 * @generated SignedSource<<a07e3d4878549cd181961e44e5b9e281>>
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
    "concreteType": "LoginPayload",
    "kind": "LinkedField",
    "name": "login",
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
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "username",
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
    "name": "LoginPageLoginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginPageLoginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4cfc4f65a0137b5308b3ca03e349bbbd",
    "id": null,
    "metadata": {},
    "name": "LoginPageLoginMutation",
    "operationKind": "mutation",
    "text": "mutation LoginPageLoginMutation(\n  $input: LoginInput!\n) {\n  login(input: $input) {\n    token\n    user {\n      id\n      username\n    }\n  }\n}\n"
  }
};
})();

node.hash = "2d86adc9a29939682852f6011b39b1f8";

module.exports = node;
