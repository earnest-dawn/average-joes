/**
 * @generated SignedSource<<afcecf9764bc976883de06d75832c3a8>>
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
    "concreteType": "DeleteRatingPayload",
    "kind": "LinkedField",
    "name": "deleteRating",
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
    "name": "mutationsDeleteRatingMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsDeleteRatingMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b6f39fe127dfb2b3f84ad1bec494ec52",
    "id": null,
    "metadata": {},
    "name": "mutationsDeleteRatingMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsDeleteRatingMutation(\n  $input: DeleteRatingInput!\n) {\n  deleteRating(input: $input) {\n    code\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "a4a603b5370096fbf7cb26b7bb34cda7";

module.exports = node;
