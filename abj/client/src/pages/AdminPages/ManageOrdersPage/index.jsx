import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";

const ManageOrdersPageQuery = graphql`
  query ManageOrdersPageQuery {
    orders {
      id
      status
      total
      customer {
        id
        username
      }
    }
  }
`;

export default function ManageOrdersPage() {
  const data = useLazyLoadQuery(ManageOrdersPageQuery, {});
  const orders = data?.orders || [];

  return (
      <div style={{ padding: 20 }}>
        <h2>Orders</h2>
        {orders.length === 0 && <p>No orders found.</p>}
        <ul>
          {orders.map((o) => (
            <li key={o.id}>
              {o.customer?.username || 'Unknown'} - {o.status} - ${o.total}
            </li>
          ))}
        </ul>
      </div>
  );
}