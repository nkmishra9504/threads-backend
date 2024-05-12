import config from 'config';
import path from 'path';
import fs from 'node:fs/promises';
import { readdir } from 'fs/promises';

const response200 = (message: string, data: object): [number, object] => {
    return [
        200,
        {
            status: 'success',
            message: message,
            data
        }
    ]
};

const response406 = (message: string): [number, object] => {
    return [
        406,
        {
            status: 'fail',
            message
        }
    ]
}

const response403 = (message: string): [number, object] => {
    return [
        403,
        {
            status: 'fail',
            message
        }
    ]
}

const response401 = (message: string): [number, object] => {
    return [
        401,
        {
            status: 'fail',
            message
        }
    ]
}

const generateFrontEndURL = (type: string, email: string, token: string, empType: string): string => {
    return `${config.get('frontend_url')}/${type}?email=${email}&token=${token}&empType=${empType}`
};

const uploadPaths = {
    "profile": "./uploads/profile",
    "sports": "./uploads/sports"
}

const saveImage = async (uploadPath: string, name: string, buffer: Buffer) => {
    await fs.writeFile(`${uploadPath}/${name}`, buffer, 'binary');

    // const files = await readdir('./uploads/profile');
    // console.log(files);
    // console.log(path.resolve());
    // console.log(path.join(path.resolve(), '/uploads/profile'));
    // console.log(path.join(__dirname, "..", "uploads/profile"));
}

const findFile = async (id: string, searchPath: string) => {
    const matchedFile = [];
    const dir = searchPath.split('./')[1]
    const files = await readdir(searchPath);
    for (let file in files) {
        if (files[file].startsWith(id)) {
            matchedFile.push(`${dir}/${files[file]}`);
        }
    }

    return matchedFile;
}

const superadminMenuArr = ['CITIES', 'INQUIRIES'];

const subadminMenuArr = ['GROUNDS'];

const capitalizeString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export {
    findFile,
    saveImage,
    response200,
    response406,
    response403,
    response401,
    uploadPaths,
    subadminMenuArr,
    capitalizeString,
    superadminMenuArr,
    generateFrontEndURL,
}