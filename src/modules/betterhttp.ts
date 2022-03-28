const HttpService = game.GetService("HttpService");

const fixRequest = (request: RequestAsyncResponse) => {
	return {
		type: request.Headers["Content-Type"],
		body: request.Headers["Content-Type"] === "application/json" && HttpService.JSONDecode(request.Body),
		statusCode: request.StatusCode,
		success: request.Success,
		statusMessage: request.StatusMessage,
	};
};

export function performRequest(
	typeRequest: RequestAsyncRequest["Method"],
	url: string,
	contentType = "application/text",
) {
	return new Promise((resolve) => {
		const req = HttpService.RequestAsync({
			Method: typeRequest,
			Url: url,
			Headers: {
				"Content-Type": contentType,
			},
		});
		resolve(fixRequest(req));
	});
}
