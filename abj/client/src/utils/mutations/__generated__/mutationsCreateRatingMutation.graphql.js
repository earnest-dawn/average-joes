/**
 * @generated SignedSource<<656cdf05accda76f387cbc3f7a1188cd>>
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
    "concreteType": "CreateRatingPayload",
    "kind": "LinkedField",
    "name": "createRating",
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
    "name": "mutationsCreateRatingMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsCreateRatingMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "30b4815ca8f3c68cab71bf6360129918",
    "id": null,
    "metadata": {},
    "name": "mutationsCreateRatingMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsCreateRatingMutation(\n  $input: CreateRatingInput!\n) {\n  createRating(input: $input) {\n    code\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "c6327abcf2aa20ce5100ed56148724a1";

module.exports = node;
