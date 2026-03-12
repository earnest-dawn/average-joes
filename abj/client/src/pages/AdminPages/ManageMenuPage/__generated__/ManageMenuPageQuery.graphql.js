/**
 * @generated SignedSource<<584e222c552d404dcf99e8ca9dc6041f>>
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
        "name": "price",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "inStock",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "category",
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
    "cacheID": "0c74b8f9f0cf10f72b2a69573c4c8219",
    "id": null,
    "metadata": {},
    "name": "ManageMenuPageQuery",
    "operationKind": "query",
    "text": "query ManageMenuPageQuery {\n  menuItems {\n    id\n    name\n    price\n    inStock\n    category\n  }\n}\n"
  }
};
})();

node.hash = "eae0a0a0a94b36e49bc0872f2ce090c4";

export default node;
