/**
 * @generated SignedSource<<ff0b71949118b28f78dd5fae404bf362>>
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
    "concreteType": "AddToCartPayload",
    "kind": "LinkedField",
    "name": "addToCart",
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
    "name": "mutationsAddToCartMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsAddToCartMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "642eb34c596c4ce1e6c4f5f74ce68057",
    "id": null,
    "metadata": {},
    "name": "mutationsAddToCartMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsAddToCartMutation(\n  $input: AddToCartInput!\n) {\n  addToCart(input: $input) {\n    code\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "c2332cd09368095d9144073f79454507";

module.exports = node;
