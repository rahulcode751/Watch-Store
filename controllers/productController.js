import slugify from 'slugify';
import productModel from '../models/productModel.js';
import fs from 'fs';

// CREATE PRODUCT || POST
export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 10000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 10mb" });
        }
        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "Error in Create Product API"
        })
    }
}

// GET ALL PRODUCT || GET
export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            total: products.length,
            message: "All Products",
            products,

        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "Error in Get All Product API"
        })
    }
}

// GET SINGLE PRODUCT || GET
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).populate('category').select("-photo");
        res.status(200).send({
            success: true,
            total: product.length,
            message: "Single Products",
            product,

        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "Error in Get Single Product API"
        })
    }
}

// GET PRODUCT PHOTO || GET
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType);
            return res.status(200).send(product.photo.data)
        }
        res.status(200).send({
            success: true,
            message: "Product Photo",
            products,

        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "Error in Get Product Photo API"
        })
    }
}

// DELETE PRODUCT || DELETE
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "Error in Delete Product API"
        })
    }
}

// UPDATE PRODUCT || PUT
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        //alidation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "Error in Update Product API"
        })
    }
}

// FILTER PRODUCT || POST
export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "Error in Filter Product API"
        })
    }
}

// COUNT PRODUCT || GET
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: false,
            total,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "Error in Count Pagination Product API"
        })
    }
}

// PRDOUCT PER PAGE || GET
export const productListController = async (req, res) => {
    try {
        const perPage = 8;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "Error in product per page  API"
        })
    }
}

// SEARCH PRODUCT || GET
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const resutls = await productModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(resutls);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Search Product API",
            error,
        });
    }
};

// SIMILAR PRODUCT || GET
export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel
            .find({
                category: cid,
                _id: { $ne: pid },
            })
            .select("-photo")
            .limit(4)
            .populate("category");
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error In Search Product API",
            error,
        });
    }
}