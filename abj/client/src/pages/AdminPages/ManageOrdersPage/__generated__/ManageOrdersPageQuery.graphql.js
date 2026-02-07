/**
 * @generated SignedSource<<62eaf2210edb97ab4263507d9687fd95>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalPrice",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ingredients",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ManageOrdersPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Order",
        "kind": "LinkedField",
        "name": "myOrders",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "OrderItem",
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MenuItems",
                "kind": "LinkedField",
                "name": "itemReference",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ManageOrdersPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Order",
        "kind": "LinkedField",
        "name": "myOrders",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "OrderItem",
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MenuItems",
                "kind": "LinkedField",
                "name": "itemReference",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v0/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6fe12ac60429977e262dfc85e166f665",
    "id": null,
    "metadata": {},
    "name": "ManageOrdersPageQuery",
    "operationKind": "query",
    "text": "query ManageOrdersPageQuery {\n  myOrders {\n    id\n    totalPrice\n    status\n    items {\n      itemReference {\n        name\n        ingredients\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

node.hash = "6150b302580570fb235d503bee86b58c";

module.exports = node;
