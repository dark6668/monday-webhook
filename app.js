require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// make link t google-map  
app.post("/", async function (req, res) {
    if (req.body.challenge) {
        console.log(JSON.stringify(req.body, 0, 2));
        res.status(200).send(req.body);
    }

    else if (JSON.stringify(req.body.event.columnValues) === '{}') {
        res.status(200).send("good");
    }
    else {
        console.log(req.body);
        let text;
        let encodedLocation;
        let locations
        // When an item is added this line of code will be executed
        if (req.body.event.columnValues) {
            const columnValues = req.body.event.columnValues;
            encodedLocation = encodeURIComponent(req.body.event.columnValues.text1.value)  // You need to change text1 according to the column on which the web-hook is activated
            text = req.body.event.columnValues.text1.value  // You need to change text1 according to the column on which the web-hook is activated
            locations = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`
            // When updating a column this line of code will be executed or or when deleting an item
        } else if (req.body.event.value != undefined && req.body.event.columnValues == undefined) {
            encodedLocation = encodeURIComponent(req.body.event.value.value); 
            text = req.body.event.value.value
            locations = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`
        }

        else if (req.body.event.value === null) {
            locations = ''
        }
        let info = {
            boardId: req.body.event.boardId,
            item: req.body.event.pulseId,
            value: locations,
            text: text
        };
         //change column id to the column you want to update(location link)
        let query = `mutation {
            change_simple_column_value (item_id:${info.item}, board_id:${info.boardId}, column_id:"location_link", value: "${info.value} ") {  
                id
            }
        }`
        let request = await fetch("https://api.monday.com/v2", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    process.env.AUTHORIZATION,
                // If you want to get permissions for another user you have to change in heroku. It is important to note that if you change then you will not have access to the previous table
            },
            body: JSON.stringify({
                query: query,
            }),
        });
        console.log(await request.json());
        res.status(200).send("good");
    }
})
// Server to update phone  
app.post("/tech", async function (req, res) {

    if (req.body.challenge) {
        console.log(JSON.stringify(req.body, 0, 2));
        res.status(200).send(req.body);
    }


    else {
        // You need to change the ID according to the ID of the table from which the details of the technician are taken
        let userList = []
        let value
        let query = `
        query {
          boards(ids: fake id) { 
            items {
              id
              name
              column_values {
                value
              }
            }
          }
        }
      `;
        let requestUsers = await fetch("https://api.monday.com/v2", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    process.env.AUTHORIZATION,
                // change according to the value of AUTHORIZATION in heroku,
            },
            body: JSON.stringify({
                query: query,
            }),
        });
        let dataUserss = await requestUsers.json();
        for (let i = 0; i < dataUserss.data.boards[0].items.length; i++) {
            let phone = JSON.parse(dataUserss.data.boards[0].items[i].column_values[1].value);
            userList.push({ name: dataUserss.data.boards[0].items[i].name, phone: phone.phone });
        }
        let result = userList.find(item => {
            return item.name === req.body.event.value.label.text;
        })

        if (result === undefined) {
            value = ''
        }
        else {
            value = result.phone
        }
          //change column id to the column you want to update(location link)
        let update = `mutation {
                change_simple_column_value (item_id:${req.body.event.pulseId}, board_id:${req.body.event.boardId}, column_id:"phone51", value:"${value}") {  
                  id
                }
              }`
        let request = await fetch("https://api.monday.com/v2", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    process.env.AUTHORIZATION,
                // change according to the value of AUTHORIZATION in heroku,
            },
            body: JSON.stringify({
                query: update,
            }),
        });
        console.log(await request.json());
        res.status(200).send("good");

    }
})



app.listen(process.env.PORT || 1323, () => {
    console.log("log");

});
