import { CheckIcon } from "@radix-ui/react-icons";
import { Checkbox } from "radix-ui";

type Props = {
	label: string;
};
export default ({ label }: Props) => {
	return (
		<div className="flex flex-row gap-[5px] text-white items-center">
			<Checkbox.Root className="CheckboxRoot" id="c1">
				<Checkbox.Indicator className="CheckboxIndicator">
					<CheckIcon />
				</Checkbox.Indicator>
			</Checkbox.Root>
			<label htmlFor="c1">{label}</label>
		</div>
	);
};
