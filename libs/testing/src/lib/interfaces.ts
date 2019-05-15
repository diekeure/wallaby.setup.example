export type ViewModelInterface<T> = { [P in keyof T]: T[P] };
