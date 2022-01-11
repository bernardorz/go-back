import path from 'path'
import crypto from 'crypto'
import multer, { StorageEngine } from 'multer'



interface IUploadConfig {
    driver: 's3' | 'disk';

    tempFolder: string;

    uploadsFolder: string;

    multer : {
        storage : StorageEngine
    }

    config: {
        disk: {
            storage: StorageEngine
        },
        aws : {
            bucket : string;
        }
    }
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

export default {


    // driver: process.env.STORAGE_DRIVER || 's3',
    driver:  'disk',

    tempFolder: tmpFolder,

    uploadsFolder: path.resolve(tmpFolder, 'uploads'),


    multer : {
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename(request, file, callback) {
              const fileHash = crypto.randomBytes(10).toString('hex');
              const fileName = `${fileHash}-${file.originalname}`;
      
              return callback(null, fileName);
            },

        })
    },

    config: {
        disk: {},
        aws : {
            bucket : 'app-gobarber-rzt'
        }
        
    }

} as IUploadConfig;