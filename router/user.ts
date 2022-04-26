import { PrismaClient } from '@prisma/client';
import { Request, Response, Router } from "express";
const router = Router();
const prisma = new PrismaClient();


router.post('/sign-up',async (req:Request, res:Response) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        res.status(422).json({error:"Name or email or password  not found Fill in the inputs"})
        return
    }
    try {
        const user = await prisma.user.create({
            data: {
                name, email, password
            }
        })
        res.status(200).json(user)
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"An error occurred on the server"})
    }

})
router.post('/createUsers',async (req:Request, res:Response) => {
    const { usersList } = req.body;
    if(!usersList){
        res.status(422).json({error:"Name or email or password  not found Fill in the inputs"})
        return
    }
    try {
        const users = await prisma.user.createMany({
            data: usersList
        })
        res.status(200).json(users)
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"An error occurred on the server"})
    }

})
router.post('/createCars',async (req:Request, res:Response) => {
    const { carsList } = req.body;
    if(!carsList){
        res.status(422).json({error:"Name or email or password  not found Fill in the inputs"})
        return
    }
    try {
        const cars = await prisma.car.createMany({
            data:carsList
        })
        res.status(200).json(cars)
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"An error occurred on the server"})
    }

})


router.get('/',async (req:Request, res:Response) => {
   try {
       const users = await prisma.user.findMany({
           include:{cars:true}
       });
       
        !users && res.status(404).json({msg:"users not found"})
   
            res.status(200).json(users);
        return
   } catch (error) {
       console.log(error);
       res.status(500).json({error:"An error occurred on the server"})
       return
   }
})
router.get('/user/:id',async (req:Request, res:Response) => {
    const {id} = req.params;
   try {
       const user = await prisma.user.findUnique({
           where:{
               id:Number(id)
           }
       });
       
        !user && res.status(404).json({msg:"users not found"})
   
            res.status(200).json(user);
        return
   } catch (error) {
       console.log(error);
       res.status(500).json({error:"An error occurred on the server"})
       return
   }
})

router.put('/update/:id',async (req:Request, res:Response) => {
        const { id }= req.params;
        const {name, email, password} =req.body;
        if(!name || !email){
            res.status(422).json({error:"Name or eamil not found Fill in the inputs"})
            return
        }

        try {
            const updateUser = await prisma.user.update({
                where:{
                    id:Number(id)
                },
                data:{
                    name, email, password
                }
            })
            return res.status(200).json(updateUser)
        } catch (error) {
            console.log(error);
            res.status(500).json({error:"An error occurred on the server"})
        }
});

router.delete('/delete/:id',async (req:Request,res:Response) => {
    const { id }= req.params;
    try {
        const deleteUser = await prisma.user.delete({ where :{ id:Number(id) }})
        return deleteUser && res.status(200).json({msg:"User deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"An error occurred on the server"})        
    }

})

export default router
