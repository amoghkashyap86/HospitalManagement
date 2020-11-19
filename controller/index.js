const mysqlconnection = require("../model/databaseconncetivity")
const express = require("express")
const bodyparser = require("body-parser")
const app = express()
const path = require("path")
// var mysqlconnection = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'amogh555kashyap',
//         database: 'sql_store'
//     }
// );
mysqlconnection.connect(function (err) {
    if (!err) {
        console.log("no error while connecting db")
    } else {
        console.log(err)
    }
})
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(express.static("../public"))
app.get("/", function (req, res) {
    // mysqlconnection.query('SELECT * FROM sql_store.customers;', (err, row, fields) => {
    //     if (!err) {
    //         // console.log(row)
    //         let headers = res.getHeaderNames()
    //         // console.log(res.headers)
    //         console.log(row)
    //         res.setHeader("Access-Control-Allow-Origin", '*')
    //         res.send(row)

    //     } else {
    //         console.log(err)
    //     }

    // })
    res.sendFile("D:\\dbmsprj\\public\\options.html")

})
app.get("/viewPatient.html", function (req, res) {
    res.sendFile("D:\\dbmsprj\\public\\viewPatient.html")
})
app.get("/detailentry.html", function (req, res) {
    res.sendFile("D:\\dbmsprj\\public\\detailentry.html")
})
var dummyid = -1;
app.post("/update", function (req, res) {
    dummyid = parseInt(req.body.pid)
    console.log(dummyid)
    res.sendFile("D:\\dbmsprj\\public\\update.html")
})
app.get("/getpidsdetail", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", '*')
    mysqlconnection.query(`select * from patient where pno=${dummyid}`, function (err, row, field) {
        console.log(dummyid)
        if (err) {
            console.log("something went wrong")
        } else {
            console.log(row)
            res.send(row)
        }
    })
})
app.post("/savedata", function (req, res) {
    pid = req.body.pid;
    pname = req.body.pname;
    page = req.body.page;
    pnumber = req.body.pnumber;
    pbloodgroup = req.body.pbloodgroup;
    pweight = req.body.pweight;
    pgender = req.body.gender;

    paddress = req.body.paddress;
    console.log(pgender)
    console.log(paddress)
    insertquerry = `insert into  patient values (${pid},'${pname}',${page},${pnumber},'${pgender}','${pbloodgroup}',${pweight},'${paddress}')`;
    mysqlconnection.query(insertquerry, function (err, row, fiels) {
        if (!err) {
            console.log(row)
        } else {
            console.log(err)
        }
    })
    res.send("form submited")

})
app.get("/getdata", function (req, res) {
    mysqlconnection.query('select * from patient;', function (err, row, fields) {
        if (!err) {
            // console.log(row.length)
            res.setHeader("Access-Control-Allow-Origin", '*')
            res.send(row)
        }
    })
})

app.listen(80, function () {
    console.log("server started")
})









