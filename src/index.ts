import { performRequest } from "./modules/betterhttp";
import emulatedHumanoid from "./modules/emulatedhumanoid";
let a,
	// eslint-disable-next-line prefer-const
	r: unknown = performRequest(
		"GET",
		"https://api.github.com/repos/techs-sus/cat/commits/main",
		"application/json",
	).await();
const gitCommit = string.sub(((r as { data: { sha: string } }).data! as { sha: string }).sha, 1, 7);
const fakeHumanoid = new emulatedHumanoid();

export {};
