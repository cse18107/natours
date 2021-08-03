const experss=require('express');

const app=experss();

app.get('/',(res,req)=>{
    
});


const port =3000;
app.listen(port , () =>{
    console.log(`App running on port ${port}...`);
});