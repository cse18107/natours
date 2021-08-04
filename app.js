const { json } = require('body-parser');
const experss = require('express');
const fs = require('fs');
const app = experss();
const morgan=require('morgan');


// 1) MIDDLEWARES==========================================

app.use(morgan('dev'));
app.use(experss.json());
app.use((req,res,next)=>{
    console.log('Hello from the middleware🤘');
    next();
});

app.use((req,res,next)=>{
    req.requestTime= new Date().toISOString();
    next();
});


// 2) ROUTE HANDLERS=========================================

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const users=JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
);

const getAllTours = (req, res) => {
    console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt:req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return (
      res.status(404).
      json({
        status: 'fail',
        message: 'Invalid ID',
      })
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers=(req,res)=>{
    res.status(200).json({
        status:"success",
        data:{
            users:users
        }
    });
}
const getUser=(req,res)=>{
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
const createUser=(req,res)=>{
    const newUserId=users[users.length-1].id+1;
    const newUser=Object.assign({id:newUserId},req.body);
    users.push(newUser);
    fs.writeFile(`${__dirname}/dev-data/data/users.json`,
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

const updateUser=(req,res)=>{
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
const deleteUser=(req,res)=>{
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


// 3) ROUTES=============================================
const tourRouter = experss.Router();

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);
app.route('/api/v1/users').get(getAllUsers).post(createUser);
app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser)


// 4) START THE SERVER========================================
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
