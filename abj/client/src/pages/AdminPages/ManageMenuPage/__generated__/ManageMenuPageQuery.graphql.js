/**
 * @generated SignedSource<<27ccea7bade49727a38f471988c8317b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "MenuItems",
    "kind": "LinkedField",
    "name": "menuItems",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
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
        "name": "ingredients",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "calories",
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
        "kind": "ScalarField",
        "name": "caption",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "images",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "category",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "inStock",
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
    "name": "ManageMenuPageQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ManageMenuPageQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "9983b7f90007915a639c676b42f726f1",
    "id": null,
    "metadata": {},
    "name": "ManageMenuPageQuery",
    "operationKind": "query",
    "text": "query ManageMenuPageQuery {\n  menuItems {\n    id\n    name\n    ingredients\n    calories\n    price\n    caption\n    images\n    category\n    inStock\n  }\n}\n"
  }
};
})();

node.hash = "7b59eb8677f1c3798e76e002e4ebb3a7";

module.exports = node;
