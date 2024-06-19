const News = require("../models/News");
const { failed, customError } = require("../utils/errorHandler")
const uploadMedia = require("../utils/fileUploader");
const mongoose = require('mongoose');
const { convertToArray } = require("../utils/helper");


const createNews = async (req, res) => {
    try {
        //  Fetching
        let { title, category, region } = req.body;
        const paragraphs = req.body['paragraphs[]'] || [];
        let images = req.files['images[]'] || [];
        if (!Array.isArray(images)) {
            images = [images]; // Convert to an array if it's a single image
        }
        const { id } = req.user;

        //  Validation
        if (!title || !paragraphs || !images) {
            throw customError("All fields are required", 404);
        }
        if (paragraphs.length === 0) {
            throw customError("Atleast one paragraph is required", 404);
        }
        if (images.length === 0) {
            throw customError("Atleast one image is required", 404)
        }
        if (!category) category = null;
        if (!region) region = null;

        //  Perform Task
        const imagesPromises = images.map(async (image) => {
            const getUrl = await uploadMedia(image, `${title}`);
            return getUrl.secure_url;
        });

        const imagesUrl = await Promise.all(imagesPromises);
        const newsObj = new News({
            title, images: imagesUrl, paragraphs, category, region, author: id
        })
        await newsObj.save();

        //  Send Response
        res.status(200).json({
            success: true,
            message: "Successfully created news"
        })
    } catch (err) {
        failed(res, err);
    }
}

const getAllNews = async (req, res) => {
    try {
        //  Fetching
        const { page = 1, limit = 10, category = null, region = null } = req.query;

        //  Validation
        const skip = (page - 1) * limit;

        //  Perform Task
        let query = {};
        if (category && mongoose.Types.ObjectId.isValid(category)) {
            query.category = new mongoose.Types.ObjectId(category);
        }
        if (region && mongoose.Types.ObjectId.isValid(region)) {
            query.region = new mongoose.Types.ObjectId(region);
        }

        const news = await News.find(query).skip(skip).limit(limit).sort({ publishedDate: -1 }).lean().exec();

        const newsWithLimitedParagraphs = news.map((article) => {
            const firstParagraph = article.paragraphs[0];
            const words = firstParagraph.split(' ');
            const limitedParagraph = words.slice(0, 100).join(' ');
            return {
                ...article,
                paragraph: [limitedParagraph],
                image: article.images[0],
            };
        });

        const totalCount = await News.countDocuments(query);
        // const totalCount = await news.length;
        const totalPages = Math.ceil(totalCount / limit);

        //  Send Response
        res.status(200).json({
            success: true,
            message: "Successfully fetched the news",
            news: newsWithLimitedParagraphs,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalCount,
            }
        })
    } catch (err) {
        failed(res, err);
    }
}

const getMyNews = async (req, res) => {
    try {
        //  Fetching
        const { id } = req.user;

        //  Validation
        const news = await News.find({ author: id })
            .populate('category')
            .populate('region')
            .populate('author', 'fullname')
            .sort({ publishedDate: -1 }).lean().exec();


        //  Send Response
        res.status(200).json({
            success: true,
            message: "Successfully get the news",
            news
        })
    } catch (err) {
        failed(res, err);
    }
}

const getNews = async (req, res) => {
    try {
        //  Fetching
        const { id } = req.query;

        //  Validation
        if (!id) {
            throw customError("Unable to get the news", 404);
        }
        const news = await News.findById(id)
            .populate('category')
            .populate('region')
            .populate('author', 'fullname')
            .lean()
            .exec();

        if (!news) {
            throw customError("Unable to find the news", 401);
        }
        await News.findByIdAndUpdate(id, { views: news.views + 1 });

        //  Send Response
        res.status(200).json({
            success: true,
            message: "Successfully get the news",
            news
        })
    } catch (err) {
        failed(res, err);
    }
}

const updateNews = async (req, res) => {
    try {
        //  Fetching
        const userId = req.user.id;
        const { id, title, category, region } = req.body;
        const paragraphs = convertToArray(req.body['paragraphs[]'] || []);
        const images = convertToArray(req.body['images[]'] || []);
        let newImages = req.files ? req.files['images[]'] || [] : [];
        newImages = convertToArray(newImages)

        //  Validation
        if (!id) {
            throw customError("Unable to get the news", 402);
        }
        const news = await News.findById(id);
        if (!news) {
            throw customError("Unable to find the news", 404);
        }
        if (news.author.toString() !== userId) {
            throw customError("This news doesn't belongs to you", 401);
        }
        if (!title || !paragraphs || (!images && !newImages)) {
            throw customError("All fields are required", 404);
        }
        if (paragraphs.length === 0) {
            throw customError("Atleast one paragraph is required", 404);
        }
        if (images.length === 0 && newImages.length === 0) {
            throw customError("Atleast one image is required", 404)
        }
        if (!category) category = "any";
        if (!region) region = "any";

        //  Perform Task
        const newImagesUrls = await Promise.all(
            newImages.map(async (image) => {
                const temp = await uploadMedia(image, title);
                return temp.secure_url;
            })
        );

        const updatedImages = [...images, ...newImagesUrls];

        await News.findByIdAndUpdate(id, {
            title, paragraphs, images: updatedImages, category, region, lastModified: Date.now()
        })

        //  Send Response
        res.status(200).json({
            success: true,
            message: "Successfully Updated the news"
        })
    } catch (err) {
        failed(res, err);
    }
}

const deleteNews = async (req, res) => {
    try {
        //  Fetching
        const { id } = req.body;
        const userId = req.user.id;

        //  Validation
        if (!id) {
            throw customError("Unable to get the news", 401);
        }
        const news = await News.findById(id);
        if (!news) {
            throw customError("Unable to find the news", 404);
        }
        if (news.author.toString() !== userId) {
            throw customError("This news is not created by you");
        }

        //  Perform Task
        await News.findByIdAndDelete(id);

        //  Send Response
        res.status(200).json({
            success: true,
            message: "Successfully delete the news"
        })
    } catch (err) {
        failed(res, err);
    }
}

exports.createNews = createNews
exports.getAllNews = getAllNews
exports.getNews = getNews
exports.getMyNews = getMyNews
exports.updateNews = updateNews
exports.deleteNews = deleteNews