const apiRouter = require('express').Router();
const listingModel = require('../Xeries/models/listing');
const userModel = require('../Xeries/models/users');

apiRouter.get('/products', async (req, res, next) => {
    try {
        let listings = await listingModel.find({}).populate({ path: "owner", model: userModel, select: {"password": 0}});
        listings = listings.reduce((agg, acc) => { 
            return agg.concat({
                product_id: acc._id.toString().replace(/^"(.*)"$/, '$1'),
                token_name: acc.name,
                original_price: acc.priceOfOriginal,
                canvas_copy_price: acc.priceOfCanvas,
                paper_copy_price: acc.priceOfCopy,
                product_author: acc.owner ? acc.owner._id : null,
                product_img: acc.image,
                category: "Art",
            });
        }, [])
        res.send(listings);
    } catch (err) {
        console.log(err)
        next("Internal server error: Couldn't get listings");
    }
});

apiRouter.post('/getOne', async (req, res, next) => {
    const { product_id } = req.body;
    try {
        const listing = await listingModel.findOne({_id: product_id}).populate({ path: "owner", model: userModel, select: {"password": 0}});
        let doc = listing._doc;
        doc = {
            product_id: doc._id.toString().replace(/^"(.*)"$/, '$1'),
            token_name: doc.name,
            original_price: doc.priceOfOriginal,
            canvas_copy_price: doc.priceOfCanvas,
            paper_copy_price: doc.priceOfCopy,
            product_author: doc.owner ? doc.owner._id : null,
            product_img: doc.image
        }
        res.send(doc);
    } catch (err) {
        console.log(err)
        next("Internal server error: Couldn't get listing");
    }
});

module.exports = apiRouter;