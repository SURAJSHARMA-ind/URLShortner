const express = require("express");
const router = express.Router();
const UrlModel = require("../database/db");
const shortUuid = require("short-uuid");

router.post("/:url", async (req, res) => {
    try{
        const {inputUrl} = req.param;
        const existingUrl = await UrlModel.findOne({mainurl:inputUrl})
        if(existingUrl){
           return res.send({
                message:`Short URL already exist${existingUrl.shortUrl}`
            })
        }else{
            
            const shortId = shortUuid.generate();
            await UrlModel.create({
                mainurl :inputUrl,
                shortUrl:shortId
            })
            return res.status(200).json({
                message:'Url generated',
                url :shortId
            })
        }

    }catch(error){
       return res.status(500).send({
            message:`Error:${error}`
        })
    }
 
});

module.exports = router;
