import { Button, ButtonProps } from "@mui/material";
import { Link } from "react-router-dom";
import { VITE_DOCSTORAGE_URL } from "../../../../../Const";

export type ScanButtonProps = {
    docStorageScan: DocStorageScan;
    children?: React.ReactNode;
} & Omit<ButtonProps<"a">, "LinkComponent" | "href" | "target">;

export type DocStorageScan = {
    /**
     * รหัสเอกสาร เป็น GUID
     */
    documentId: string;
    /**
     * รหัสเอกสาร เป็น CODE ขึ้นต้นด้วย ตัวอักษร จำแนกประเภทเอกสาร และเลขที่เอกสาร
     */
    documentCode: string;
    /**
     * ประเภทเอกสาร
     */
    documentSubType: string;
    /**
     * ค่าหลักสำหรับการค้นหาเอกสาร
     */
    mainIndex?: string;
    /**
     * ค่าสำหรับการค้นหาเอกสาร
     */
    searchIndex?: string;
    /**
     * ค่าสำหรับการค้นหาเอกสาร
     */
    index?: DocStorageScanIndex[];
};

export type DocStorageScanIndex = {
    /**
     *  Key สำหรับการค้นหาเอกสาร
     */
    indexId?: string;
    /**
     *  Value สำหรับการค้นหาเอกสาร
     */
    indexValue?: string;
};

/**
 * ScanButton
 *
 * ปุ่มสำหรับเปิดหน้า Scan ของ DocStorage ใข้ props ได้เหมือนกับ Button ของ Material UI
 * * DocStorage - https://docstorage.siamsmile.co.th/
 * * MUI Button - https://mui.com/material-ui/react-button/
 *
 */
const ScanButton = ({ docStorageScan, children = "Scan", startIcon = "dcument_scanner", ...rest }: ScanButtonProps) => {
    let url = VITE_DOCSTORAGE_URL + "/document/scan?";
    url += `documentId=${docStorageScan.documentId}&`;
    url += `documentCode=${docStorageScan.documentCode}&`;
    url += `documentSubType=${docStorageScan.documentSubType}&`;
    url += `mainIndex=${docStorageScan.mainIndex}&`;
    url += `searchIndex=${docStorageScan.searchIndex}&`;

    if (docStorageScan.index) {
        docStorageScan.index.forEach((index) => {
            url += `indexId[]=${index.indexId}&indexValue[]${index.indexValue}&`;
        });
    }

    return (
        <Button LinkComponent={Link} href={url} target="_blank" startIcon={startIcon} {...rest}>
            {children}
        </Button>
    );
};

export default ScanButton;
