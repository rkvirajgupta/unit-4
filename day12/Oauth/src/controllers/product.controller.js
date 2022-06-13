
const express = require("express")

const router = express.Router();
const authenticate = require("../middlewares/authenticate")
const authorise = require("../middlewares/authorise");

const Product = require("../models/product.model")

router.post("", authenticate, async (req, res) => {

    req.body.user_id = req.userID;
    try{
        const product = await Product.create(req.body)
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
 
})

router.get("", async (req, res) => {
    try{
        const product = await Product.find()
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
});

// authorisation should only be given to product owner
router.patch("/:productId",
    authenticate,
    authorise,
    async(req,res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId,req.body,{new: true});
        return res.status(200).send(product);
    } catch(err) {
        return res.status(500).send(err);
    }
    // return res.send("success!");
});

router.delete("/:productId",
    authenticate,
    authorise,
    async(req,res) => {
        try{
            const product = await Product.findByIdAndDelete(req.params.productId);
            return res.status(200).send(`Deleted: ${product}`);
        } catch(err) {
            return res.status(500).send(err);
        }
        
})

module.exports = router;