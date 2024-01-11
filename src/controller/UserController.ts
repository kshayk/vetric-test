import {UserRequestService} from "../service/UserRequestService.js";
import {Request, Response} from "express";
import {generateErrorResponse} from "../util/api/errorResponse.js";

export class UserController {
    public async getUserData(request: Request, response: Response): Promise<void> {
        const fbUserID = request.query.user_id;
        if (!fbUserID) {
            response.status(400).send(generateErrorResponse("Missing required body parameters"));
            return;
        }

        const parsedFbUserID = Number(fbUserID);
        if (isNaN(parsedFbUserID) || parsedFbUserID <= 0) {
            response.status(400).send(generateErrorResponse("Invalid user ID"));
            return;
        }

        const userRequestService = new UserRequestService(parsedFbUserID);

        try {
            const userData = await userRequestService.getUserData();

            response.send({
                success: true,
                userData
            });
        } catch (e) {
            console.error("Error getting user data", e);
            response.status(500).send(generateErrorResponse("Error getting user data"));
        }

        return;
    }
}