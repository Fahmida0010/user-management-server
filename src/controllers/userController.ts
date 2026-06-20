import { db } from "../db/db";


// IMPORTANT:
// BEFORE ANY ACTION middleware checks user


// GET ALL USERS
export const getUsers = async (
  req:any,
  res:any
)=>{

  try {

    const result = await db.query(
      `
      SELECT 
        id,
        name,
        email,
        status,
        last_login
      FROM users
      ORDER BY last_login DESC NULLS LAST
      `
    );


    res.json(result.rows);


  } catch(error:any){

    res.status(500).json({
      message:error.message
    });

  }

};




// BLOCK USERS
export const blockUsers = async(
  req:any,
  res:any
)=>{

 try {

  const { ids } = req.body;


  await db.query(
    `
    UPDATE users
    SET status='blocked'
    WHERE id = ANY($1)
    `,
    [ids]
  );


  res.json({
    message:"Blocked"
  });



 }catch(error:any){

  res.status(500).json({
    message:error.message
  });

 }

};




// UNBLOCK USERS
export const unblockUsers = async(
 req:any,
 res:any
)=>{

 try {

  const { ids } = req.body;



  await db.query(
    `
    UPDATE users
    SET status='active'
    WHERE id = ANY($1)
    `,
    [ids]
  );



  res.json({
    message:"Unblocked"
  });



 }catch(error:any){

  res.status(500).json({
    message:error.message
  });

 }

};




// DELETE USERS
// IMPORTANT:
// real delete, not soft delete
export const deleteUsers = async(
 req:any,
 res:any
)=>{

 try {

  const { ids } = req.body;



  await db.query(
    `
    DELETE FROM users
    WHERE id = ANY($1)
    `,
    [ids]
  );



  res.json({
    message:"Deleted"
  });



 }catch(error:any){

  res.status(500).json({
    message:error.message
  });

 }

};




// DELETE UNVERIFIED USERS
export const deleteUnverified = async(
 req:any,
 res:any
)=>{


 try {


  await db.query(
    `
    DELETE FROM users
    WHERE status='unverified'
    `
  );



  res.json({
    message:"Unverified deleted"
  });



 }catch(error:any){

  res.status(500).json({
    message:error.message
  });

 }


};