/**
 * @generated SignedSource<<e1e01bf2a49376971e45096b225bffcd>>
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
    "concreteType": "RestaurantType",
    "kind": "LinkedField",
    "name": "allRestaurants",
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
        "name": "category",
        "storageKey": null
      },
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
        "name": "isVerified",
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
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ManageRestaurantsPageQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "6e0ff23f46105ef48d5db6afa5825676",
    "id": null,
    "metadata": {},
    "name": "ManageRestaurantsPageQuery",
    "operationKind": "query",
    "text": "query ManageRestaurantsPageQuery {\n  allRestaurants {\n    id\n    name\n    category\n    location\n    isVerified\n  }\n}\n"
  }
};
})();

node.hash = "36662a3b931c04f6cb645d39dba076be";

export default node;
