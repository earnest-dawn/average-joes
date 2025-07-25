/**
 * @generated SignedSource<<159980f022500fe735b7e1abe75f692c>>
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
    "name": "queriesMenuItemsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "queriesMenuItemsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "c43c393973ca5ce9ec74532efae70788",
    "id": null,
    "metadata": {},
    "name": "queriesMenuItemsQuery",
    "operationKind": "query",
    "text": "query queriesMenuItemsQuery {\n  menuItems {\n    id\n    name\n    ingredients\n    calories\n    price\n    caption\n  }\n}\n"
  }
};
})();

node.hash = "56ff1aaa457fd2214715a128d59db694";

module.exports = node;
