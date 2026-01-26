/**
 * @generated SignedSource<<ad192797eeb806d55cbf910033438cad>>
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
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "category",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Restaurant",
    "kind": "LinkedField",
    "name": "restaurants",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "location",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "contactInfo",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hours",
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
        "concreteType": "MenuItems",
        "kind": "LinkedField",
        "name": "menuItems",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v3/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "inStock",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
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
            "concreteType": "MenuItems",
            "kind": "LinkedField",
            "name": "menuItems",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Rating",
        "kind": "LinkedField",
        "name": "ratings",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "emoji",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "ratingText",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ManageRestaurantsPageQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ManageRestaurantsPageQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "9bcf1675cb4f71f2402af05942916bf4",
    "id": null,
    "metadata": {},
    "name": "ManageRestaurantsPageQuery",
    "operationKind": "query",
    "text": "query ManageRestaurantsPageQuery {\n  restaurants {\n    id\n    name\n    category\n    location\n    contactInfo\n    hours\n    images\n    menuItems {\n      id\n      name\n      price\n      category\n      inStock\n    }\n    combos {\n      id\n      title\n      menuItems {\n        id\n        name\n        price\n      }\n    }\n    ratings {\n      id\n      emoji\n      ratingText\n      user {\n        id\n        username\n      }\n    }\n  }\n}\n"
  }
};
})();

node.hash = "5214523eafecffccac8fc3c4d3aed7e7";

module.exports = node;
