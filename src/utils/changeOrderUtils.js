import * as XLSX from "xlsx";
import { toast } from "sonner";

export const parseFile = (file) => {
  const excelUUID = "d25beb3e-821d-4b92-8c1f-3ba23a00cd73";
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();

      reader.onerror = (e) => {
        reject(new Error("File reading error: " + e.target.error));
      };

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          const uuidCell = worksheet["QS5"];
          const uuidValue = uuidCell ? uuidCell.v : null;

          if (uuidValue !== excelUUID) {
            toast.error("Incorrect Excel file provided");
            throw new Error("Invalid Excel file: UUID mismatch.");
          }

          const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          const row7 = sheetData[6] || [];
          const row8 = sheetData[7] || [];

          const labor = row7[13] || 0;
          const material = row7[14] || 0;
          const subs = row7[15] || 0;
          const wtpm = row7[16] || 0;
          const total = row8[20] || 0;

          const excelData = {
            name: file.name.slice(0, -5),
            labor,
            material,
            subs,
            wtpm,
            total,
          };

          const rowObjects = [];
          let rowIndex = 13;

          while (rowIndex < sheetData.length) {
            const row = sheetData[rowIndex];

            if (
              !row ||
              row.every(
                (cell) => cell === undefined || cell === null || cell === "",
              )
            ) {
              break;
            }

            const desc = row[0];
            const unit = row[9];

            if (desc && unit) {
              const prices = [
                { type: "labor", price: row[13] || 0 },
                { type: "material", price: row[14] || 0 },
                { type: "subs", price: row[15] || 0 },
                { type: "wtpm", price: row[16] || 0 },
              ];

              prices.forEach((priceObj) => {
                if (priceObj.price && priceObj.price !== 0) {
                  rowObjects.push({
                    desc,
                    unit,
                    type: priceObj.type,
                    price: priceObj.price,
                  });
                }
              });
            }

            rowIndex++;
          }

          resolve({ excelData, rowObjects });
        } catch (error) {
          reject(new Error("Error parsing Excel file: " + error.message));
        }
      };

      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error("No file provided."));
    }
  });
};
