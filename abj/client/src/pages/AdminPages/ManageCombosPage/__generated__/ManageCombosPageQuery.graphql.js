/**
 * @generated SignedSource<<479082d18ebed1494eb9ec7aad8f62f4>>
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
    "concreteType": "Combos",
    "kind": "LinkedField",
    "name": "combos",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "price",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "MenuItems",
        "kind": "LinkedField",
        "name": "menuItems",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "calories",
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
    "name": "ManageCombosPageQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ManageCombosPageQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "403a25d780ea90b79afbaff7e14ed5c6",
    "id": null,
    "metadata": {},
    "name": "ManageCombosPageQuery",
    "operationKind": "query",
    "text": "query ManageCombosPageQuery {\n  combos {\n    id\n    title\n    price\n    menuItems {\n      id\n      name\n      calories\n    }\n  }\n}\n"
  }
};
})();

node.hash = "0373b26c73e4e39af85352a1a8fc8ccc";

export default node;
