import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {
    // if authernticated , connect to mongoose
    await mongooseConnect();
    const {method} = req;
    if (method === 'GET'){
        if (req.query?.id){
            // fetch a single project by id
            const Blogs = await Blog.findById(req.query.id);
            res.json(Blogs);

        }else if (req.query?.tags){
            // /fetch project by category\
            const Blogs = await Blog.find({ tags: req.query.tags})
            res.json(Blogs);
    
        }else if (req.query?.blogcategory){
            // /fetch project by category\
            const Blogs = await Blog.find({ blogcategory: req.query.blogcategory})
            res.json(Blogs);
    
        }else if (req.query?.slug){
            // fetch peroject by slug
            const Blogs = await Blog.find({ slug:req.query.slug});
            res.josn(Blogs.reverse()) ;
            
        }else {
            // fetch all projects
            const Blogs = await Blog.find();
            res.json( Blogs.reverse());
        }

        
    }else{
        res.status(405).json({message: 'Method Not Allowes'});

    }

}