const express = require("express");

const Product = require("../models/product.model");
const client = require("../configs/redis");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    client.get("product", async (err, fetchedData) => {
      if (fetchedData) {
        const products = JSON.parse(fetchedData);

        return res.status(201).send(products);

      } else {
        try {
          const product = await Product.find({}).lean().exec();

          client.set("product", JSON.stringify(product));

          return res.status(200).send(product);
        } catch (error) {

          return res.status(500).send({ message: error.message });
        }
      }
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    const products = await Product.find({}).lean().exec();

    client.set("product", JSON.stringify(products));

    return res.status(200).send(products);
  } catch (error) {

    return res.send(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    client.get(`product.${req.params.id}`, async (err, fetchedData) => {
      if (fetchedData) {
        const products = JSON.parse(fetchedData);

        return res.status(201).send(products);
      } else {
        try {

          const product = await Product.findById(req.params.id).lean().exec();

          client.set(`product.${req.params.id}`, JSON.stringify(product));

          return res.status(200).send(product);
        } catch (error) {

          return res.status(500).send({ message: error.message });
        }
      }
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();

      const products= await Product.find({}).lean().exec();

      client.set(`product.${req.params.id}`,JSON.stringify(product))

      client.set("product",JSON.stringify(products))

      return res.status(200).send(product);
    } catch (error) {

      return res.status(500).send({ message: error.message });
    }
  });

router.delete("/:id",async(req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id)

        const products = await Product.find({}).lean().exec();

        client.del(`product.${req.params.id}`)

        client.set("product",JSON.stringify(products))

        return res.status(200).send(product)
        
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})  
module.exports = router;