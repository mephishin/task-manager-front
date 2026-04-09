import * as zip from "@zip.js/zip.js";
import { ZipReader } from "@zip.js/zip.js";
import mime from "mime";

export type FileDictionary = {
    [key: string]: File[];
};

export async function transformZipToFiles(arrayBuffer: ArrayBuffer): Promise<File[]> {
    const reader = new zip.BlobReader(new Blob([arrayBuffer]));

    const zipReader = new ZipReader(reader);

    const result = Array<File>();

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

    await zipReader.close();

    return result;
}

export async function transformZipToListOfCommentFiles(arrayBuffer: ArrayBuffer): Promise<FileDictionary> {
    const reader = new zip.BlobReader(new Blob([arrayBuffer]));

    const zipReader = new ZipReader(reader);

    var result: FileDictionary = {};

    const entries = await zipReader.getEntries();

    for (let entry of entries) {
        if (!entry.directory) {
            const writer = new zip.BlobWriter();
            const name = entry.filename;

            const commendId = name.slice(0, 36);

            const filename = name.slice(36);

            const type = mime.getType(filename)
            const data = await entry.getData(writer);
            const file = new File([data], filename, { type: type ?? '' });

            addFileToDictionary(result, commendId, file);
        }
    }

    await zipReader.close();

    return result;
}

export async function transformFilesToZip(Files: File[]): Promise<ArrayBuffer> {
    const zipFileWriter = new zip.BlobWriter();
    const zipWriter = new zip.ZipWriter(zipFileWriter);
    for (let file of Files) {
        const reader = new zip.BlobReader(file);

        await zipWriter.add(file.name, reader);

    }
    await zipWriter.close();
    const zipFileBlob = await zipFileWriter.getData();

    return zipFileBlob.arrayBuffer()
}

function addFileToDictionary(dict: FileDictionary, key: string, file: File): void {
    (dict[key] || (dict[key] = [])).push(file);
}



