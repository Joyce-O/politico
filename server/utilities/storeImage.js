export const storeImage = (id,imgUrl) => {
cloudinary.uploader.upload(
    imgUrl, 
    {public_id: id}, 
    (error, result) => { 
      if (error) error;
      else result; 
    }
  );
};