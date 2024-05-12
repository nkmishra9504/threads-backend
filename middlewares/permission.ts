import { Request, Response, NextFunction } from "express";
// import { AuthenticatedRequest } from "./authentication";
import { response403 } from "../helpers/utils";
import { Role } from "../schemas/schema";
import { CustomRequest } from "../server";

const menus = {
    Employees: 'EMPLOYEES',
    Customers: 'CUSTOMERS',
    Cities: 'CITIES',
    Roles: 'ROLES',
    Menus: 'MENUS',
    Grounds: 'GROUNDS',
    Inquiries: 'Inquiries'
}

const add = (menu_name: string) => {
    return async function (req: CustomRequest, res: Response, next: NextFunction) {
        const user = req.user;

        if (!user) {
            const resonse = response403("User not authenticated");
            return res.status(resonse[0]).json(resonse[1]);
        }
        else {
            try {
                const roles = await Role.findOne({ _id: user.role }).populate({
                    path: 'permissions.menuId',
                    select: 'name'
                });
                let permission = roles?.permissions.find((permission: any) => permission.menuId.name == menu_name);

                const response = response403("Permission denied");
                if (user && (user.is_superadmin || user.is_admin)) {
                    next();
                    return;
                }
                else if (!permission) {
                    return res.status(response[0]).json(response[1]);
                }
                else if (!permission.add) {
                    return res.status(response[0]).json(response[1]);
                }

                next();
            }
            catch (err) {
                console.log(err);
            }
        }
    }
}

const view = (menu_name: string) => {
    return async function (req: CustomRequest, res: Response, next: NextFunction) {
        const user = req.user;

        if (!user) {
            const resonse = response403("User not authenticated");
            return res.status(resonse[0]).json(resonse[1]);
        }
        else {
            try {
                const roles = await Role.findOne({ _id: user.role }).populate({
                    path: 'permissions.menuId',
                    select: 'name'
                });
                let permission = roles?.permissions.find((permission: any) => permission.menuId.name == menu_name);

                const response = response403("Permission denied");
                if (user && (user.is_superadmin || user.is_admin)) {
                    next();
                    return;
                }
                else if (!permission) {
                    return res.status(response[0]).json(response[1]);
                }
                else if (!permission.view) {
                    return res.status(response[0]).json(response[1]);
                }

                next();
            }
            catch (err) {
                console.log(err);
            }
        }
    }
}

const update = (menu_name: string) => {
    return async function (req: CustomRequest, res: Response, next: NextFunction) {
        const user = req.user;

        if (!user) {
            const resonse = response403("User not authenticated");
            return res.status(resonse[0]).json(resonse[1]);
        }
        else {
            try {
                const roles = await Role.findOne({ _id: user.role }).populate({
                    path: 'permissions.menuId',
                    select: 'name'
                });
                let permission = roles?.permissions.find((permission: any) => permission.menuId.name == menu_name);

                const response = response403("Permission denied");
                if (user && (user.is_superadmin || user.is_admin)) {
                    next();
                    return;
                }
                else if (!permission) {
                    return res.status(response[0]).json(response[1]);
                }
                else if (!permission.update) {
                    return res.status(response[0]).json(response[1]);
                }

                next();
            }
            catch (err) {
                console.log(err);
            }
        }
    }
}

const remove = (menu_name: string) => {
    return async function (req: CustomRequest, res: Response, next: NextFunction) {
        const user = req.user;

        if (!user) {
            const resonse = response403("User not authenticated");
            return res.status(resonse[0]).json(resonse[1]);
        }
        else {
            try {
                const roles = await Role.findOne({ _id: user.role }).populate({
                    path: 'permissions.menuId',
                    select: 'name'
                });
                let permission = roles?.permissions.find((permission: any) => permission.menuId.name == menu_name);

                const response = response403("Permission denied");
                if (user && (user.is_superadmin || user.is_admin)) {
                    next();
                    return;
                }
                else if (!permission) {
                    return res.status(response[0]).json(response[1]);
                }
                else if (!permission.delete) {
                    return res.status(response[0]).json(response[1]);
                }

                next();
            }
            catch (err) {
                console.log(err);
            }
        }
    }
}

export {
    menus,
    add,
    view,
    update,
    remove
}