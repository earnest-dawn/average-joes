/**
 * @generated SignedSource<<2519ce8b64d6b075e5c3783ab4e152ac>>
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v5 = [
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
        "concreteType": "CartType",
        "kind": "LinkedField",
        "name": "cart",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "total",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CartItemType",
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "quantity",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "unitPrice",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "MenuItems",
                "kind": "LinkedField",
                "name": "menuItem",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Combos",
                "kind": "LinkedField",
                "name": "combo",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "OrderOnlinePageAddToCartMutation",
    "selections": (v5/*: any*/),
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
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "a8696d9b0a7d3edd03c67d1ad63b7d7b",
    "id": null,
    "metadata": {},
    "name": "OrderOnlinePageAddToCartMutation",
    "operationKind": "mutation",
    "text": "mutation OrderOnlinePageAddToCartMutation(\n  $menuItemId: UUID\n  $comboId: UUID\n  $quantity: Int = 1\n) {\n  addToCart(menuItemId: $menuItemId, comboId: $comboId, quantity: $quantity) {\n    cart {\n      id\n      total\n      items {\n        id\n        quantity\n        unitPrice\n        menuItem {\n          id\n          name\n          price\n        }\n        combo {\n          id\n          title\n          price\n        }\n      }\n    }\n    success\n    message\n  }\n}\n"
  }
};
})();

node.hash = "c6f0e41118b883ec4a0ee8d9c18e94cb";

export default node;
