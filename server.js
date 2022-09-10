const express = require("express")
const app = express()
app.use(express.json())


const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize(
 'blog_db',
 'root',
 '123456',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);


sequelize.authenticate()
.then(() => console.log("connected"))
.catch((err) => console.log("Not connected"))


const Book = sequelize.define("books", {
   title: {
     type: DataTypes.STRING,
     allowNull: false
   },
   author: {
     type: DataTypes.STRING,
     allowNull: false
   },
});


sequelize.sync().then(() => {
    console.log('Book table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});


app.get("/insert", async(req, res) => {
    try {
        await Book.create({
            title: "Adventure-3",
            author: "Fatih"
        }),
        res.json("Inserted!")
        console.log("Inserted!")
    } catch (error) {
        console.log(error)
    }
})

app.get("/getall", async(req, res) => {
    try {
        const books = await Book.findAll()
        res.json(books)
        console.log(books)
    } catch (error) {
        console.log(error)
    }
})


app.get("/getone", async(req, res) => {
    try {
        const book = await Book.findOne({
            where: {
                id : "2"
            }
        })
        res.json(book)
        console.log(book)
    } catch (error) {
        console.log(error)
    }
})

app.get("/delete", async(req, res) => {
    try {
        const book = await Book.destroy({
            where: {
                id : "2"
            }
        })
        res.json(book)
        console.log(book)
    } catch (error) {
        console.log(error)
    }
})

app.get("/update", async(req, res) => {
    try {
        const book = await Book.update(
            {title: "new title"},
            {where: {id: "1"}}
        )
        res.json(book)
        console.log(book)
    } catch (error) {
        console.log(error)
    }
})





app.listen(3000)