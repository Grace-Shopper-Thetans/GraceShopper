import React from 'react'

const UserOrders = props => {
  let orders = props.userData.orders
  if (orders) {
    orders = orders.filter(order => order.status === true)
  }
  if (orders !== undefined) {
    return (
      <div id="orders">
        <h3>Past Orders:</h3>
        {orders.map(order => {
          return (
            <div key={order.id}>
              <h4>
                {order.createdAt +
                  order.orders_products.qty +
                  order.orders_products.finalPrice}
              </h4>
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <div id="orders">
      <h3>Past Orders:</h3>
      <h3>No Orders have been placed.</h3>
    </div>
  )
}

export default UserOrders
