# Interview Assignment: Re-create Facebook Request with Express

Your primary goal is to replicate a specific Facebook request using an Express server. The details and flow of the task are outlined below.

## Task Flow

1. **Objective:** Your first task is to re-create a specific Facebook request and embed it within an Express server.
2. **Resources:** We will provide you with:
   - An `.har` network file.
   - An Express boilerplate to kickstart your implementation.
   - [got documentation](https://github.com/sindresorhus/got)
3. **Network File Examination:** To find the request you need to replicate, look inside the provided `.har` network file for a request sent to the `/api/graphql` endpoint that includes the string “ProfileCometHeaderQuery” in the HTTP payload.
   - **Note:** This step can be done either manually or programatically, and you will not tested on how you managed to find the request and it's parameters.<br>HAR stands for HTTP Archive format, meaning the attached file is an export of HTTP activity while browsing facebook.com. It shouldn't be processed by the server in runtime, it just there to help you construct the request sent by the server.
6. **Replicate the Request:** Craft a function to replicate the request. This function should accept a variable profile ID and use the variable's value inside the replicated request payload where it fits.
   - **Note:** For example, [This account's](https://www.facebook.com/profile.php?id=100004624831685) ID is `100004624831685`.<br>You can know you've replicated the request sucessfully when the response contains data such as the profile's gender (e.g `{ ... "gender":"MALE" ... }`)
8. **Endpoint Implementation:** Develop an endpoint in your Express server:
   - The endpoint should take in a profile ID parameter.
   - It should utilize the previously crafted request function to return the response from Facebook.
   - You should handle the following:
     1. Validate the profile ID parameter is a number and if invalid, send a suitable error response.
     2. Implement correct retry mechanisms.
     3. If retries fail, handle those failures gracefully and send a corresponding error response.
9. **Response Format:** Ensure that the server returns responses in JSON format.
10. **Server Robustness:** It's paramount that your server is robust, meaning it should not crash under any circumstances. Ensure error handling is comprehensive.
11. **Code Separation:** Your code should be modular and well-separated.

## Important Notes

- **Code Quality:** Prioritize code readability and robustness. Your code will be evaluated based on its clarity, structure, and resilience.
- **Communication:** Don't hesitate to ask questions. Being communicative and clear about your doubts or the choices you make is vital. If you're uncertain about something or need further clarity, reach out.
- **Implementation:**
   - `got` comes pre-installed in the boilerplate, but you can use any HTTP library of your liking and it's not a necesary to implement the replicated request with `got`.
   - The implemantation of the replicated request should not require any kind of authenticated or authorization.

---

We wish you the best with the assignment! We're excited to see your solution. Remember, the journey and your approach are as valuable as the final product. Happy coding!
