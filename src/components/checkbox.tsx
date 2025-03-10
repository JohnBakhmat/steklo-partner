import { CheckIcon } from "@radix-ui/react-icons";
import { Checkbox } from "radix-ui";

type Props = {
	label: string;
	isChecked: boolean;
	onCheckedChange: (x: boolean) => void;
};
export default ({ label, onCheckedChange, isChecked }: Props) => {
	return (
		<div className="flex flex-row gap-[5px] text-white items-center">
			<Checkbox.Root
				className="CheckboxRoot"
				id="c1"
				onCheckedChange={onCheckedChange}
				checked={isChecked}
			>
				<Checkbox.Indicator className="CheckboxIndicator">
					<CheckIcon />
				</Checkbox.Indicator>
			</Checkbox.Root>
			<label htmlFor="c1">{label}</label>
		</div>
	);
};
