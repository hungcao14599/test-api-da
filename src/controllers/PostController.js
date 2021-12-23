const Post = require('../models/Post');

class PostController {
    fetch = async (req, res) => {
        try {
            const posts = await Post.find({
                user: req.userId,
            }).populate('users', ['username']);
            res.json({ success: true, posts });
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
        const { title, description, url, status } = req.body;
        // kiem tra su ton tai cua title
        if (!title)
            return res
                .status(400)
                .json({ success: false, message: 'Title is required' });
        try {
            // tao moi 1 post
            const newPost = new Post({
                title,
                description,
                url: url.startsWith('https://') ? url : `https://${url}`,
                status: status || 'TO LEARN',
                user: req.userId, // = newUser._id
            });

            await newPost.save();

            res.json({ success: true, message: 'Tạo thành công!!!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Lỗi server' });
        }
    };

    put = async (req, res) => {
        const { title, description, url, status } = req.body;
        if (!title)
            return res
                .status(400)
                .json({ success: false, message: 'Title is required' });
        try {
            let updatedPost = {
                title,
                description,
                url: url.startsWith('https://') ? url : `https://${url}`,
                status: status || 'TO LEARN',
            };
            const postUpdateCondition = {
                _id: req.params.id,
                user: req.userId,
            };
            updatedPost = await Post.findOneAndUpdate(
                postUpdateCondition,
                updatedPost,
                { new: true },
            );
            // nguoi dung khong duoc phep cap nhat bai viet hoac khong tim thay bai viet
            if (!updatedPost)
                return res.status(401).json({
                    success: false,
                    message:
                        'Không tìm thấy bài đăng hoặc người dùng không được ủy quyền',
                });
            res.json({
                success: true,
                message: 'Cập nhật thành công',
                post: updatedPost,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Lỗi server' });
        }
    };

    delete = async (req, res) => {
        try {
            const postDeleteCondition = { _id: req.params.id, user: req.userId };
            const deletePost = await Post.findOneAndDelete(postDeleteCondition);
            // nguoi dung khong duoc phep xoa bai viet hoac khong tim thay bai viet
            if (!deletePost)
                return res.status(401).json({
                    success: false,
                    message:
                        'Không tìm thấy bài đăng hoặc người dùng không được ủy quyền',
                });
            res.status(200).json({
                success: true,
                message: 'Xóa thành công',
                post: deletePost,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Lỗi server' });
        }
    };
}

module.exports = new PostController();
