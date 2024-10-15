import { ImageModel } from '../models/image.model';

export function extractImgDirName(imgList: Array<ImageModel>): Array<string> {
    const dirList: Array<string> = [];

    for (let i = 0; i < imgList.length; i++) {
        const imgData = imgList[i];
        const dirName: string = imgData.url.split('/')[4];

        if (dirList.includes(dirName)) {
            continue;
        } else {
            dirList.push(dirName);
        }
    }

    return dirList;
}