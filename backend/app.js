const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors())


let user = {
  username: 'bhavna',
  password: '123'
};

let orders = [
  {
    orderNumber: 1,
    orderDueDate: new Date(),
    customerBuyername: 'NavTech',
    customerAddress: 'Hyderabad, Floor - 9',
    customerPhone: '1234567890',
    orderTotal: 100
  },
  {
    orderNumber: 2,
    orderDueDate: new Date(),
    customerBuyername: 'Test1',
    customerAddress: 'Dubai',
    customerPhone: '0024789456',
    orderTotal: 50
  },
  {
    orderNumber: 3,
    orderDueDate: new Date(),
    customerBuyername: 'Bhavna',
    customerAddress: 'Maharashtra',
    customerPhone: '8007497281',
    orderTotal: 77
  }
];

app.post('/login', (req, res) => {
  if (req.body.userName === user.username && req.body.password === user.password) {
    res.status(200).json({
      message: 'Login Successfully'
    })
  } else {
    res.status(403).json({
      message: "Incorrect Username or Password"
    })
  }
});

app.get("/getAllOrders", (req,res) => {
  res.json({
    orders: orders,
  });
});

app.post('/addOrder', (req, res) => {
  let orderNumber = orders[(orders.length) - 1].orderNumber + 1;
  req.body.orderNumber = orderNumber;
  orders.push(req.body);
  return res.json(orders[orders.length -1]);
});

app.post('/updateOrderDetails', (req, res) => {
  if (!req.body.orderNumber) {
    res.status(403).json({
      mesage: 'Order Number Missing'
    })
  }
  let returnObj;
  orders.forEach((order) => {
    if (order.orderNumber === req.body.orderNumber) {
      if (req.body.orderDueDate) {
        order.orderDueDate = req.body.orderDueDate;
      }
      if (req.body.customerBuyername) {
        order.customerBuyername = req.body.customerBuyername;
      }
      if (req.body.customerAddress) {
        order.customerAddress = req.body.customerAddress;
      }
      if (req.body.customerPhone) {
        order.customerPhone = req.body.customerPhone;
      }
      if (req.body.orderTotal) {
        order.orderTotal = req.body.orderTotal;
      }
      returnObj = order;
    }
  });
  return res.status(200).json(returnObj);
});

app.post('/deleteOrder', (req, res) => {
  if (!req.body.orderNumber) {
    res.status(403).json({
      mesage: 'Order Number Missing'
    })
  }
  orders = orders.filter((order) => order.orderNumber !== req.body.orderNumber);
  console.log('Deleted order with order number = ', req.body.orderNumber);
  return res.status(200).json(orders);
});

module.exports = app;