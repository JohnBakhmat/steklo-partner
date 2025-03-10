type Props = {
	isActive: boolean;
	label: string;
	onClick: () => void;
	id: string;
};
export const RadioButton = ({ isActive, label, onClick, id }: Props) => {
	return (
		<div className="flex flex-row gap-4 items-center">
			<button
				type="button"
				className={
					"w-[23px] h-[23px] rounded-full bg-white aria-[pressed=false]:after:hidden radio-checked focus:outline-accent"
				}
				aria-pressed={isActive}
				onClick={onClick}
				id={id}
			/>
			<label htmlFor={id}>{label}</label>
		</div>
	);
};
