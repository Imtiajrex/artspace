/* eslint-disable @typescript-eslint/no-var-requires */
import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiResponse } from 'cloudinary';
// Configuration
cloudinary.config({
	cloud_name: 'do9x4igrn',
	api_key: '589622428626876',
	api_secret: 'xtwCceZP4a2ZKCT9COgz7J_f40w'
});

// Upload
export const upload = async (file: string) => {
	let result;
	try {
		result = await cloudinary.uploader.upload(file);
		return result;
	} catch (e: any) {
		console.log('upload error', e.message);
	}
};
