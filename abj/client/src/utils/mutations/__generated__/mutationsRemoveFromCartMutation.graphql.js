/**
 * @generated SignedSource<<e92c36766f136f86c06a8b30be7764f2>>
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
    "concreteType": "RemoveFromCartPayload",
    "kind": "LinkedField",
    "name": "removeFromCart",
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
    "name": "mutationsRemoveFromCartMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsRemoveFromCartMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b3c843aaf3698d08affd72ea203f524c",
    "id": null,
    "metadata": {},
    "name": "mutationsRemoveFromCartMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsRemoveFromCartMutation(\n  $input: RemoveFromCartInput!\n) {\n  removeFromCart(input: $input) {\n    code\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "015552b60e6549101a684ee262604ea7";

module.exports = node;
