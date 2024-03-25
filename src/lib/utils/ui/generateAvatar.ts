import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";

const generateAvatar = (seed = "") => {
	return createAvatar(thumbs, {
		seed, radius:50, size : 64
	}).toDataUriSync()
}

export default generateAvatar