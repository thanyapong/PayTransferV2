// import { PermissionList } from "../../Const";
import BlankPage from "../pages/BlankPage";
import { RouteMapType } from "./AuthRoutes";
import PaytransferInterfacePage from "../modules/PayTransferInterface/pages/PaytransferInterfacePage";
import PayTransferTransactionPage from "../modules/PayTransferInterface/pages/PayTransferTransactionPage";

/**
 * Config ของ route ของ Project
 *
 * รูปแบบของ Config นี้ จะมี ดังนี้
 * ```
 * {
 *         path: string,            // ที่อยู่ของ path url ที่จะใช้
 *        title: string,            // ชื่อของหน้าที่จะใช้แสดง
 *      element: JSX.Element,       // หน้าที่จะใช้แสดง
 *    children?: RouteMapType[],    // ถ้ามี children จะเป็นการกำหนด route ของหน้านั้นๆ
 *       index?: boolean,           // ถ้าเป็น true ต้ว Element จะเป็นหน้าแรกที่จะแสดง
 * permissions?: string[],          // กำหนด permission ที่จะใช้เข้าถึงหน้านี้ได้
 *   condition?: "AND" | "OR",      // กำหนดว่า permission เป็นการ AND หรือ OR
 * }
 * ```
 */

const Routes: RouteMapType[] = [
    {
        path: "/blank-page",
        title: "Blank Page",
        element: <BlankPage body="Blank Page" />,
    },
    {
        path: "/paytransferinterface",
        title: "PayTransfer Interface",
        element: <PaytransferInterfacePage/>,
        // permissions: [PermissionList.employee_read, PermissionList.employee_write],
        condition: "OR",
    },
    {
        path: "/paytransfertransaction/:refCode",
        title: "PayTransfer Transaction",
        element: <PayTransferTransactionPage/>,
        // permissions: [PermissionList.employee_read, PermissionList.employee_write],
        condition: "OR",
    },
    {
        path: "/test-permission",
        title: "Test Page",
        element: <BlankPage body="Test Permission" />,
        // permissions: [PermissionList.employee_read, PermissionList.employee_write],
        condition: "AND",
    },
];

export default Routes;
