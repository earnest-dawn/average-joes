/**
 * @generated SignedSource<<a7e794f3377e2df4f8f91226893807d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "AddToCartPayload",
    "kind": "LinkedField",
    "name": "addToCart",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "code",
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
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "CartType",
        "kind": "LinkedField",
        "name": "cart",
        "plural": false,
        "selections": [
          (v1/*: any*/),
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
            "concreteType": "CartItemType",
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              (v1/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
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
                "name": "combo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "clientMutationId",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "mutationsAddToCartMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsAddToCartMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "02050054b6be5d5245d2bd2709644042",
    "id": null,
    "metadata": {},
    "name": "mutationsAddToCartMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsAddToCartMutation(\n  $input: AddToCartInput!\n) {\n  addToCart(input: $input) {\n    code\n    success\n    message\n    cart {\n      id\n      totalPrice\n      items {\n        id\n        quantity\n        unitPrice\n        menuItem {\n          name\n        }\n        combo {\n          title\n        }\n      }\n    }\n    clientMutationId\n  }\n}\n"
  }
};
})();

node.hash = "8905d9f82881d43cb441cd0d71e2d23b";

export default node;
