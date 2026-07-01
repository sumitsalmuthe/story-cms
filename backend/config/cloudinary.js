const cloudinary = require("cloudinary").v2;

console.log("CLOUD_NAME =", process.env.CLOUD_NAME);
console.log("API_KEY =", process.env.API_KEY);
console.log("API_SECRET =", process.env.API_SECRET);


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

cloudinary.api.ping()
.then(result => console.log(result))
.catch(err => console.log(err));

module.exports = cloudinary;