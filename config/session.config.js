const app = require("../app");
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: "je suis un secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 14,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://alex:qwe@localhost/twitter?authSource=admin",
      ttl: 60 * 60 * 24 * 14,
    }),
  })
);
