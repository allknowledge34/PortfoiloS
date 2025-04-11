
import { Project } from "@/models/Project";
import projects from "../projects";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    // if authernticated , connect to mongoose
    await mongooseConnect();
    const {method} = req;
    
    if (method === 'GET'){
        if (req.query?.id){
            // fetch a single project by id
            const project = await Project.findById(req.query.id);
            res.josn(project);

        }else if (req.query?.projectcategory){
            // /fetch project by category\
            const projectcate = await Project.find({ projectcategory: req.query.projectcategory})
            res.josn(projectcate);
    
        }else if (req.query?.slug){
            // fetch peroject by slug
            const projectslug = await Project.find({ slug:req.query.slug});
            res.json(projectslug.reverse()) ;
            
        }else {
            // fetch all projects
            const projects = await Project.find();
            res.json( projects.reverse());
        }

        
    }else{
        res.status(405).json({message: 'Method Not Allowes'});

    }

}