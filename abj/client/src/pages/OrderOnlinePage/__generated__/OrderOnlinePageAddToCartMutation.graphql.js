/**
 * @generated SignedSource<<bfab6c0a61b77767d26ebd069563c471>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "comboId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "menuItemId"
},
v2 = {
  "defaultValue": 1,
  "kind": "LocalArgument",
  "name": "quantity"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "comboId",
        "variableName": "comboId"
      },
      {
        "kind": "Variable",
        "name": "menuItemId",
        "variableName": "menuItemId"
      },
      {
        "kind": "Variable",
        "name": "quantity",
        "variableName": "quantity"
      }
    ],
    "concreteType": "AddToCart",
    "kind": "LinkedField",
    "name": "addToCart",
    "plural": false,
    "selections": [
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "OrderOnlinePageAddToCartMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "OrderOnlinePageAddToCartMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "831a91eb225b77883f18dd8cb22d9ecb",
    "id": null,
    "metadata": {},
    "name": "OrderOnlinePageAddToCartMutation",
    "operationKind": "mutation",
    "text": "mutation OrderOnlinePageAddToCartMutation(\n  $menuItemId: UUID\n  $comboId: UUID\n  $quantity: Int = 1\n) {\n  addToCart(menuItemId: $menuItemId, comboId: $comboId, quantity: $quantity) {\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "48b0d4c879458c7fe407110337eb2f38";

export default node;
