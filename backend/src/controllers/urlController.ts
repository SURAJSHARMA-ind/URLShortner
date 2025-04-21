import { Request, Response } from 'express'
import { UrlModel } from '../models/url';
import shortUUID from 'short-uuid';

const port = process.env.PORT

export const shortUrl = async (req: Request, res: Response) => {
    try {
        const inputUrl = req.body;
        console.log(inputUrl);
        if (!inputUrl.url) {
            res.status(400).json({
                message: "Url not found ",
            });
            return
        }
        const existingUrl = await UrlModel.findOne({ mainurl: inputUrl.url });
        if (existingUrl) {
            res.send({
                message: `Short URL already exist `,
                shortUrl: `http://localhost:${port}/${existingUrl.shortUrl}`
            });
            return
        }

        const id = shortUUID.generate();
        const shortId = id.slice(0, 8)
        console.log(shortId);

        await UrlModel.create({
            mainurl: inputUrl.url,
            shortUrl: shortId,
        });
        res.status(200).json({
            message: "Url generated",
            shortUrl: `http://localhost:${port}/${shortId}`,
        });
        return

    } catch (error) {
        res.status(500).send({
            message: `Error:${error}`,
        });
        return
    }
}

export const getShortUrl = async (req: Request, res: Response) => {
    const id = req.params.shortId;
    console.log("Short URL ID:", id);

    if (!id) {
         res.status(400).json({ message: "Incorrect format" });
         return
    }
    try {
        const update = { $inc: { visitors: 1 } };
        const existingId = await UrlModel.findOneAndUpdate({ shortUrl: id }, update, { new: true });

        if (!existingId) {
             res.status(404).send({ message: "Not found" });
             return
        }

        const redirectUrl = existingId.mainurl;
        res.redirect(redirectUrl);
    } catch (error) {
         res.status(500).send({ message: `Error: ${error}` });
    }
}
