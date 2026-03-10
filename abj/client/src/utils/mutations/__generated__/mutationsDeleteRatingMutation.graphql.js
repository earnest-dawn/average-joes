/**
 * @generated SignedSource<<2b65d474038233390b6aaff29ffa9265>>
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
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Rating",
        "kind": "LinkedField",
        "name": "rating",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
    "cacheID": "0fc079ee268762b906ceba543e809982",
    "id": null,
    "metadata": {},
    "name": "mutationsDeleteRatingMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsDeleteRatingMutation(\n  $input: DeleteRatingInput!\n) {\n  deleteRating(input: $input) {\n    code\n    success\n    message\n    rating {\n      id\n    }\n    clientMutationId\n  }\n}\n"
  }
};
})();

node.hash = "2436ce855f1a2ab28f4d218c2ff50489";

export default node;
