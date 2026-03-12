/**
 * @generated SignedSource<<cda49fc3df6cddbd2f033d9f36b81673>>
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
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "OrderType",
    "kind": "LinkedField",
    "name": "myOrders",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "totalPrice",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "customer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ManageOrdersPageQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ManageOrdersPageQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2eb21cdba3b1b26dcd8c1ad1d4babe5a",
    "id": null,
    "metadata": {},
    "name": "ManageOrdersPageQuery",
    "operationKind": "query",
    "text": "query ManageOrdersPageQuery {\n  myOrders {\n    id\n    status\n    totalPrice\n    customer {\n      id\n      username\n    }\n  }\n}\n"
  }
};
})();

node.hash = "51fc156133feabf9970a29831c586533";

export default node;
