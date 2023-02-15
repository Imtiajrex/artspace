/* eslint-disable @typescript-eslint/no-var-requires */
const cloudinary = require('cloudinary').v2;

// Configuration
cloudinary.config({
	cloud_name: 'do9x4igrn',
	api_key: '589622428626876',
	api_secret: 'xtwCceZP4a2ZKCT9COgz7J_f40w'
});

// Upload
export const upload = async (file: File) => {
	const result = await cloudinary.uploader.upload(file, {
		folder: 'artspace'
	});
	return result;
};
