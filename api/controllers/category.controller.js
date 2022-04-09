const Categories = require ('../models/category.model');

const categoryController= {
    //ham xu li caregory
    getCategory: async (req, res)=> {
        const category = await Categories.find();
        if(!category){
            return res.status(404).json({ message: "Not fond" });
        }
        return res.status(201).json(category);
    },
    getCategoryById: async (req, res) => {
        Categories.findById(req.params.id)// viet ham findbyid model
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    status: false,
                    message: "Khong tim thay danh muc voi id la " + req.params.id
                });
            }
            res.send({
                status: true,
                message: 'Truy xuat danh muc thanh cong',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                status: false,
                message: "Danh muc khong ton tai " + req.params.id
            });
        }
        return res.status(500).send({
            status: false,
            message: "Loi truy xuat danh muc" + req.params.id
        });
    });
    },
    postCategory: async (req, res) => {
        const category = new Categories(req.body);
       
        await category.save();
        res.status(201).json({
           status: 200, 
           result: {category}
          });

          //chan loi them danh muc da ton tai

    },
    updateCategory: async (req, res)=> {
        if(!req.body) {
            return res.status(400).send({
                status: false,
                message: "Vui long nhap thong tin day du"
            });
        }
    
        // tim danh muc va cap nhat danh muc
        Categories.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
            .then(data => {
                if(!data) {
                    return res.status(404).send({
                        status: false,
                        message: "Khong tim thay danh muc " + req.params.id
                    });
                }
                res.send({
                    status: true,
                    data: data
                });
            }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    status: false,
                    message: "Khong tim thay danh muc "
                });
            }
            return res.status(500).send({
                status: false,
                message: "Loi update danh muc" 
            });
        });
    },

    deleteCategory: async (req, res) => {
        Categories.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    status: false,
                    message: "Khong tim thay danh muc " 
                });
            }
            res.send({
                status: true,
                message: "Delete category thanh cong!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                status: false,
                message: "Danh muc khong ton tai " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Khong the xoa danh muc san pham " + req.params.id
        });
    });
    },
    getFilterCategory: async (req, res)=> {
        var name_search = req.query.name ;
        console.log(name_search)
		const filterCategpory =await Categories.filter(cate=> {
            cate.name == name_search;

			
            
        }
		);
        console.log(filterCategpory)
		try {
			if(!filterCategpory){
				res.status(404).json("Not found");
			}
			return res.status(200).json({
				data: filterCategpory
			})
		} catch (error) {
			res.status(500).json(error);
		}		

    },



}
module.exports = categoryController;