const fs = require('fs');


const users=JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);


exports.getAllUsers=(req,res)=>{
    res.status(200).json({
        status:"success",
        data:{
            users:users
        }
    });
}
exports.getUser=(req,res)=>{
    const userId=req.params.id*1;
    const user=users.find((el)=>el.id===userId);
    if(!user){
        return res.status(404).json({
            status:"Invalid",
            message:"Invalid user id"
        });
    }
    res.status(201).json({
        status:"success",
        data:{
            user:user
        }
    });
}
exports.createUser=(req,res)=>{
    const newUserId=users[users.length-1].id+1;
    const newUser=Object.assign({id:newUserId},req.body);
    users.push(newUser);
    fs.writeFile(`${__dirname}/../dev-data/data/users.json`,
        JSON.stringify(users),
        (err)=>{
            res.status(200).json({
                status:"success",
                user:{
                    newUser
                }
            });
        }
    );
}

exports.updateUser=(req,res)=>{
    if(req.params.id*1>users.length){
        return res.status(404).json({
            status:"Invalid",
            message:"Invalid user"
        });
    }
    res.status(203).json({
        status:"success",
        message:"<User Updated successfully>"
    });
};
exports.deleteUser=(req,res)=>{
    if(req.params.id*1>users.length){
        return res.status(404).json({
            status:"Invalid",
            message:"Invalid user"
        });
    }
    res.status(204).json({
        status:"success",
        data:null
    });
};
