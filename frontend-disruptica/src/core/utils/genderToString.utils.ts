import type { GenderType } from "@/core/domain/entities";

export const genderToString = (gender: GenderType) => {
	switch (gender) {
		case 'M':
			return 'Male';
		case 'F':
			return 'Female';
		case 'O':
			return 'Other';
		default:
			return 'Other';
	}
};