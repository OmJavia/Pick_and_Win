const mysql = require('../Config/db');
var bcrypt = require('bcryptjs');
const crypto = require('crypto'); 
var jwt = require('jsonwebtoken');


function addproduct (req,res) {
    try{
        const {name,price,quantity} = req.body;
        if (!name || !price || !quantity) {
            return res.status(400).json({msg:"Invalid Request"});
        }
        const check = `SELECT * FROM addproduct WHERE name = ?`;
        mysql.query (check,[name], (err, data, fields) => {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: "Database Error"});
            }
            if (data.length > 0) {
                return res.status(290).json({
                    message: "Product Already Exists"
                });
            }
        const insert = `INSERT INTO addproduct (name, price, quantity) VALUES (?, ?, ?)`;
        mysql.query(insert, [name, price, quantity], (err, data, fields) => {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: "Database Error"});
            }
            else {
                return res.status(200).json({msg: "Product Added Successfully"});
            }
        })
        })
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"Internal Server Error"});
    }
}

function getproduct (req,res) {
    try{
        const search = `SELECT * FROM addproduct`;
        mysql.query(search, (err, data, fields) => {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: "Database Error"});
            }
            else {
                return res.status(200).json({
                    msg: "Product List",
                    data: data
                });
            }
    })
}catch(err){
    console.log(err);
    res.status(500).json({msg:"Internal Server Error"});
}}

function login (req,res) {
    try{
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({msg: "All Fields are Required"});
        }

        const check = `SELECT * FROM user WHERE email = '${email}'`;
        console.log(check);
        mysql.query(check, (err,data,fields) => {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: "Database Error"});
            }
            if (data.length > 0) {
                a = bcrypt.compareSync(password, data[0].password);
                console.log(a);
                if (a) {
                    var token = jwt.sign({ user_id: data[0].id }, 'secret',{ expiresIn: '1h' });
                    var tokendata = {token: token};
                    data[0].token = tokendata.token;
                    delete data[0].password;
                    // data[0].password = undefined;
                    return res.status(200).json({
                        msg: "User Found",
                        data: data   
                    })
                }
                return res.status(200).json({msg: "Invalid Password", data : []});
            
            }

            else {
                return res.status(400).json({
                    msg: "Data Not Found",
                    data: []
                })
            }
    })
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg: "Internal Server Error"});
    }}

function signup(req,res) {
    try{
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({msg: "All Fields are Required"});
        }
        const check = `SELECT * FROM user WHERE email = '${email}'`;
        mysql.query(check, (err,data,fields) => {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: "Database Error"});
            }
            if (data.length > 0) {
                return res.status(300).json({msg: "User Already Exists"});
            }
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            
            const insert = `INSERT INTO user(name, email, password) VALUES ('${name}', '${email}', '${hash}')`
            mysql.query(insert, (err,data,fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({msg: "SQL Error"});
                }
                else {
                    return res.status(200).json({msg: "User Added Successfully"});
                }
            })
    })
}catch(err){
    console.log(err);
    res.status(500).json({msg: "Internal Server Error"});
}}

function deleteproduct (req,res) {
    try{
        const {name} = req.body;
        if (!name) {
            return res.status(400).json({msg: "No Product Found"});
        }
        const check = `SELECT * FROM addproduct WHERE name = '${name}'`;
        mysql.query(check, (err,data,fields) => {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: "Database Error"});
            }
            if (data.length>0) {
                const deleteProduct = `DELETE FROM addproduct WHERE name = '${name}'`
                mysql.query(deleteProduct, (err,data,fields) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({msg: "SQL Error"});
                    }
                    else {
                        return res.status(200).json({msg: "Product Deleted Successfully"});
                    
                    } 
            })
        }
        return res.status(200).json({msg: "Product not found", data: []});
    })

}catch(err){
    console.log(err);
    res.status(500).json({msg: "Internal Server Error"});
}}

function updateproduct(req, res) {
    try {
        const { oldname, newname } = req.body;

        // Validate input
        if (!oldname || !newname) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Check if the product exists
        const check = `SELECT * FROM addproduct WHERE name = '${oldname}'`;
        mysql.query(check, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: "Database error" });
            }

            if (data.length > 0) {
                // Update the product
                const updateProduct = `UPDATE addproduct SET name = '${newname}' WHERE name = '${oldname}'`;
                mysql.query(updateProduct, (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({ msg: "SQL error while updating product" });
                    }
                    return res.status(200).json({ msg: "Product updated successfully" });
                });
            } else {
                // Send response if product is not found
                return res.status(404).json({ msg: "Product not found" });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

function orderplace(req, res) {
    try {
        const { product_id, user_id, quantity, payment_id } = req.body;

        // Validate input
        if (!product_id || !user_id || !quantity || quantity <= 0) {
            return res.status(400).json({ msg: "All fields are required, and quantity must be greater than 0" });
        }

        // Check if the product exists
        const checkProduct = `SELECT * FROM addproduct WHERE id = ?`;
        mysql.query(checkProduct, [product_id], (err, productData) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: "Database error while checking product" });
            }

            if (productData.length > 0) {
                const price = productData[0].price; // Get price of the product
                const totalPrice = price * quantity;

                // Insert into the `order` table
                const insertOrder = `INSERT INTO \`order\` (product_id, user_id, quantity, payment_id, total_price) VALUES (?, ?, ?, ?, ?)`;
                mysql.query(insertOrder, [product_id, user_id, quantity, payment_id, totalPrice], (err, orderResult) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ msg: "Database error while inserting order" });
                    }

                    const orderId = orderResult.insertId; // Get the newly generated order_id

                    // Fetch the latest ticket number
                    const getTicketId = `SELECT MAX(ticket_id) AS maxTicketId FROM tickets`;
                    mysql.query(getTicketId, (err, ticketResult) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ msg: "Error fetching ticket ID" });
                        }

                        let maxTicketNumber = 1;
                        if (ticketResult[0].maxTicketId) {
                            const lastTicketId = ticketResult[0].maxTicketId.replace("LUCKY", ""); // Remove "LUCKY"
                            maxTicketNumber = parseInt(lastTicketId) + 1; // Increment the number
                        }

                        // Generate ticket IDs and prepare batch insert
                        let ticketValues = [];
                        for (let i = 0; i < quantity; i++) {
                            const ticketId = `LUCKY${String(maxTicketNumber).padStart(5, '0')}`; // Format as LUCKY00001
                            ticketValues.push([ticketId, orderId]);
                            maxTicketNumber++; // Increment for the next ticket
                        }

                        // Insert into the `tickets` table
                        const insertTickets = `INSERT INTO tickets (ticket_id, order_id) VALUES ?`;
                        mysql.query(insertTickets, [ticketValues], (err) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).json({ msg: "Database error while inserting tickets" });
                            }

                            return res.status(200).json({
                                msg: "Order placed successfully",
                                orderId: orderId,
                                totalPrice: totalPrice,
                            });
                        });
                    });
                });
            } else {
                return res.status(404).json({ msg: "Product not found" });
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = {
    addproduct , getproduct, login, signup, deleteproduct, updateproduct, orderplace
}