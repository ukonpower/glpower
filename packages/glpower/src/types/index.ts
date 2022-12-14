export namespace Types {

	export type ToNullable<T> = {
		[P in keyof T]?: T[P];
	};

}
