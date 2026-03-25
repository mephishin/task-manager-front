import * as zip from "@zip.js/zip.js";
import { ZipReader } from "@zip.js/zip.js";
import mime from "mime";
import { CommentFiles } from "../model/task/CommentFiles";

export async function transformZipToFiles(arrayBuffer: ArrayBuffer): Promise<File[]> {
    const reader = new zip.BlobReader(new Blob([arrayBuffer]));

    const zipReader = new ZipReader(reader);

    var result = Array<File>();

    const entries = await zipReader.getEntries();

    for (let entry of entries) {
        if (!entry.directory) {
            const writer = new zip.BlobWriter();
            const filename = entry.filename;
            const type = mime.getType(filename)
            const data = await entry.getData(writer);
            const file = new File([data], entry.filename, { type: type ?? '' });

            result.push(file);
        }
    }

    zipReader.close();

    return result;
}

export type FileDictionary = {
  [key: string]: File[];
};

function addFileToDictionary(dict: FileDictionary, key: string, file: File): void {
  (dict[key] || (dict[key] = [])).push(file);
}

export async function transformZipToListOfCommentFiles(arrayBuffer: ArrayBuffer): Promise<FileDictionary> {
    const reader = new zip.BlobReader(new Blob([arrayBuffer]));

    const zipReader = new ZipReader(reader);

    var result: FileDictionary = {};

    const entries = await zipReader.getEntries();

    for (let entry of entries) {
        if (!entry.directory) {
            const writer = new zip.BlobWriter();
            const filename = entry.filename;
            const type = mime.getType(filename)
            const data = await entry.getData(writer);
            const file = new File([data], entry.filename.split('_')[1], { type: type ?? '' });

            addFileToDictionary(result, filename.split('_')[0], file);
        }
    }

    zipReader.close();

    return result;
}

