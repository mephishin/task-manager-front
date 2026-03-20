import * as zip from "@zip.js/zip.js";
import { ZipReader } from "@zip.js/zip.js";
import mime from "mime";

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
            const file = new File([data], entry.filename, {type:type ?? ''});

            console.log(file)

            result.push(file);
        }
    }

    zipReader.close();

    return result;
}