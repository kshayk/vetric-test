import {HeaderType} from "../type/HeaderType.js";
import * as process from "process";
import {UserDataRequestType} from "../type/request/UserDataRequestType.js";
import got from 'got';
import {UserRequestValidator} from "../util/validator/UserRequestValidator.js";

export class UserRequestService {
    private readonly fbUserID: number;
    private readonly requestURL = 'https://www.facebook.com/api/graphql/';

    constructor(fbUserID: number) {
        this.fbUserID = fbUserID;
    }

    public async getUserData() : Promise<string> {
        let responseBody = null;
        try {
            responseBody = await this.sendRequest();
        } catch (e) {
            throw new Error("Request failed 3 times. Try again later.");
        }

        const validator =  new UserRequestValidator(responseBody);
        validator.validate();

        if (validator.getErrorMessage() !== null) {
            throw new Error(`Response validator failed with error: ${validator.getErrorMessage() as string}`);
        }

        return responseBody;
    }

    private generateHeaders() : HeaderType {
        return {
            "content-type": "application/x-www-form-urlencoded",
            "origin": "https://www.facebook.com",
            "sec-fetch-site": "same-origin",
            "user-agent": process.env.USER_AGENT as string, //Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
            "X-Fb-Friendly-Name": "ProfileCometHeaderQuery"
        };
    }

    private generateFormData() : UserDataRequestType {
        return {
            "__a": 1,
            "__comet_req": 15,
            "fb_api_req_friendly_name": "ProfileCometHeaderQuery",
            "variables": `{"scale":2,"selectedID":${this.fbUserID},"selectedSpaceType":"community","shouldUseFXIMProfilePicEditor":false,"userID":${this.fbUserID}}`,
            "doc_id": "7189130084511655",
            "fb_dtsg": "NAcNaYYCo4_dig6eonyiqMaXY6RBNTYsdrs1BMiHgo6djDASGg9NkZA:46:1704895301"
        };

    }

    private async sendRequest() : Promise<any> {
        return got.post(this.requestURL, {
            headers: this.generateHeaders(),
            form: this.generateFormData(),
            retry: {
                limit: 3,
                methods: ['POST'],
            }
        }).text();
    }
}