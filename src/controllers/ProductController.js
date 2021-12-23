const Product = require('../models/Product');

class ProductController {
    fetch = async (req, res) => {
        try {
            const products = await Product.find(req._id);
            res.json({ success: true, products });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    };

    

    create = async (req, res) => {
        // lay du lieu tu request
        const { name, price, status } = req.body;
        // kiem tra su ton tai cua title
        if (!name)
            return res
                .status(400)
                .json({ success: false, message: 'Title is required' });
        try {
            // tao moi 1 post
            const newProduct = new Product({
                name,
                price,
                status
            });

            await newProduct.save();

            res.json({ success: true, message: 'Tạo thành công!!!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Lỗi server' });
        }
    };

    find = async (req, res) => {
        try {
            const products = await Product.findById(req.params.id);
            res.json({ success: true, products });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    };


    put = async (req, res) => {
        const { name, price, status } = req.body;
        if (!name)
            return res
                .status(400)
                .json({ success: false, message: 'Title is required' });
        try {
            let updatedProduct = {
                name,
                price,
                status
            };
            const productUpdateCondition = {
                _id: req.params.id,
            };
            updatedProduct = await Product.findOneAndUpdate(
                productUpdateCondition,
                updatedProduct,
                { new: true },
            );
            // nguoi dung khong duoc phep cap nhat bai viet hoac khong tim thay bai viet
            if (!updatedProduct)
                return res.status(401).json({
                    success: false,
                    message:
                        'Không tìm thấy bài đăng hoặc người dùng không được ủy quyền',
                });
            res.json({
                success: true,
                message: 'Cập nhật thành công',
                product: updatedProduct || false,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Lỗi server' });
        }
    };

    delete = async (req, res) => {
        try {
            const productDeleteCondition = { _id: req.params.id};
            const deleteProduct = await Product.findOneAndDelete(productDeleteCondition);
            // nguoi dung khong duoc phep xoa bai viet hoac khong tim thay bai viet
            if (!deleteProduct)
                return res.status(401).json({
                    success: false,
                    message:
                        'Không tìm thấy bài đăng hoặc người dùng không được ủy quyền',
                });
            res.status(200).json({
                success: true,
                message: 'Xóa thành công',
                product: deleteProduct,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Lỗi server' });
        }
    };
}

module.exports = new ProductController();
