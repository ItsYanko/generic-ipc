const Events = require("./classes/events");

let a = new Events();
a.on("yey", () => {
    console.log("HELLO WRLD");
})

a.trigger("yey");
a.trigger("*");