/**
 * @generated SignedSource<<8ea153b09ca0aa309c9ec14e303abc51>>
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
  "name": "ingredients",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "calories",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "caption",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "inStock",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "images",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "OrderOnlinePageQuery",
    "selections": [
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "MenuItemsFragment"
          },
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/)
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
    "name": "OrderOnlinePageQuery",
    "selections": [
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
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v7/*: any*/),
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
                "kind": "ScalarField",
                "name": "createdAt",
                "storageKey": null
              },
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "category",
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2bc822f2ab59c1129f76b087793ed310",
    "id": null,
    "metadata": {},
    "name": "OrderOnlinePageQuery",
    "operationKind": "query",
    "text": "query OrderOnlinePageQuery {\n  menuItems {\n    id\n    ...MenuItemsFragment\n    name\n    ingredients\n    calories\n    price\n    caption\n    inStock\n  }\n}\n\nfragment MenuItemsFragment on MenuItems {\n  id\n  name\n  ingredients\n  calories\n  price\n  caption\n  images\n  ratings {\n    ...RatingFragment\n  }\n  category\n  inStock\n}\n\nfragment RatingFragment on Rating {\n  id\n  emoji\n  ratingText\n  createdAt\n  images\n  user {\n    username\n  }\n}\n"
  }
};
})();

node.hash = "5f4918ad37fa912d21cad4dedd125b41";

export default node;
