const Category = require("../models/Category");
const Region = require("../models/Region");
const News = require("../models/News");
const { failed, customError } = require("../utils/errorHandler")


const createCategory = async(req, res)=>{
    try{
        //  Fetching
        const { name } = req.body;

        //  Validation
        if(!name){
            throw customError("Enter category correctly");
        }
        if(name.length === 0){
            throw customError("Category can't be empty");
        }
        const alreadyExist = await  Category.findOne({category: name});
        if(alreadyExist){
            throw customError("This category already exist");
        }

        //  Perform Task
        await   Category.create({category: name});
        const category = await  Category.find().sort({category: 1});

        //  Send response
        res.status(200).json({
            success: true,
            message: "Successfully created the category",
            data: category
        })
    }catch(err){
        failed(res, err);
    }
}

const getCategory = async(req, res)=>{
    try{
        //  Perform task
        const allCategories = await     Category.find().sort({category: 1});
        const news = await News.find({}).sort({ publishedDate: -1 }).limit(1).lean().exec();
        let breakingNews = "";
        if (news.length > 0 && news[0].paragraphs.length > 0) {
          breakingNews = `${news[0].title}: ${news[0].paragraphs[0]}`;
        }
    
        res.status(200).json({
            success: true,
            message: "Successfully fetched the category",
            categories: allCategories,
            breakingNews: breakingNews
        })
    }catch(err){
        failed(res, err);
    }
}

const updateCategory = async(req, res)=>{
    try{
        //  Fetching
        let { id, name } = req.body;
        
        //  Validation
        if(!name){
            throw customError("Enter category correctly");
        }
        name = name.toLowerCase();
        let check = await     Category.findById(id);
        if(!check){
            throw customError("This category does not exist");
        }
        if(check.category === "any"){
            throw customError("You can't update 'Any' category");
        }
        check = await   Category.findOne({category: name});
        if(check){
            throw customError("This name category already exist");
        }
        
        //  Perform task
        await   Category.findByIdAndUpdate(id, {category: name});
        const allCategories = await     Category.find().sort({category: 1});


        //  Send response
        res.status(200).json({
            success: true, 
            message: "Category updated successfully",
            data: allCategories
        })
    }catch(err){
        failed(res, err);
    }
}

const deleteCategory = async(req, res)=>{
    try{
        //  Fetching
        const { id } = req.body;
        
        //  Validation
        let check = await     Category.findById(id);
        if(!check){
            throw customError("This category does not exist");
        }
        if(check.category === "any"){
            throw customError("You can't delete 'Any' category");
        }
        
        //  Perform task
        await   Category.findByIdAndDelete(id);
        const category = await  Category.find().sort({category: 1});
        await   News.updateMany({category: id}, { $set: { category: null } })

        //  Send response
        res.status(200).json({
            success: true, 
            message: "Category deleted successfully",
            data: category,
        })
    }catch(err){
        failed(res, err);
    }
}

const createRegion = async(req, res)=>{
    try{
        //  Fetching
        const { name } = req.body;

        //  Validation
        if(!name){
            throw customError("Enter region correctly");
        }
        if(name.length === 0){
            throw customError("Region can't be empty");
        }
        const alreadyExist = await  Region.findOne({region: name});
        if(alreadyExist){
            throw customError("This region already exist");
        }

        //  Perform Task
        await   Region.create({region: name});
        const allRegions = await     Region.find().sort({region: 1});

        //  Send response
        res.status(200).json({
            success: true,
            message: "Successfully created the region",
            data: allRegions
        })
    }catch(err){
        failed(res, err);
    }
}

const getRegion = async(req, res)=>{
    try{
        //  Perform task
        const allRegions = await     Region.find().sort({region: 1});

        res.status(200).json({
            success: true,
            message: "Successfully fetched the regions",
            regions: allRegions
        })
    }catch(err){
        failed(res, err);
    }
}

const updateRegion = async(req, res)=>{
    try{
        //  Fetching
        let { id, name } = req.body;
        
        //  Validation
        if(!name){
            throw customError("Enter region correctly");
        }
        name = name.toLowerCase();
        let check = await     Region.findById(id);
        if(!check){
            throw customError("This region does not exist");
        }
        if(check.region === "any"){
            throw customError("You can't update 'Any' region");
        }
        check = await   Region.findOne({region: name});
        if(check){
            throw customError("This name region already exist");
        }
        
        //  Perform task
        await   Region.findByIdAndUpdate(id, {region: name});        
        const allRegions = await     Region.find().sort({region: 1});

        //  Send response
        res.status(200).json({
            success: true, 
            message: "Region updated successfully",
            data: allRegions
        })
    }catch(err){
        failed(res, err);
    }
}

const deleteRegion = async(req, res)=>{
    try{
        //  Fetching
        const { id } = req.body;
        
        //  Validation
        let check = await     Region.findById(id);
        if(!check){
            throw customError("This region does not exist");
        }
        if(check.region === "any"){
            throw customError("You can't delete 'Any' region");
        }
        
        //  Perform task
        await   Region.findByIdAndDelete(id);
        const allRegions = await     Region.find().sort({region: 1});
        await   News.updateMany({region: id}, { $set: { region: null } })

        //  Send response
        res.status(200).json({
            success: true, 
            message: "Region deleted successfully",
            data: allRegions
        })
    }catch(err){
        failed(res, err);
    }
}


exports.createCategory = createCategory;
exports.getCategory = getCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;

exports.createRegion = createRegion;
exports.getRegion = getRegion;
exports.updateRegion = updateRegion;
exports.deleteRegion = deleteRegion;