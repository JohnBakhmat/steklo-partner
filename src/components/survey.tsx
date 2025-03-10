import { Image } from "astro:assets";
import { zodResolver } from "@hookform/resolvers/zod";
import { type PropsWithChildren, useEffect } from "react";
import {
	Controller,
	type ControllerFieldState,
	type ControllerProps,
	type ControllerRenderProps,
	type SubmitHandler,
	useForm,
} from "react-hook-form";
import { z } from "zod";
import { RadioButton } from "./radio-button";

const schema = z.object({
	hasMeasurementExperience: z.string().transform((x) => x === "true"),
	name: z
		.string()
		.min(2, "Имя не может быть короче 2 символов")
		.max(50, "Имя не может быть длинее 50 символов"),
	phone: z
		.string()
		.regex(
			/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
			"Неправильный номер телефона",
		),
});
type Schema = z.infer<typeof schema>;

export const Survey = () => {
	const { register, handleSubmit, watch, formState, setValue, control } =
		useForm<Schema>({
			defaultValues: {
				hasMeasurementExperience: true,
			},
			resolver: zodResolver(schema),
		});

	const values = watch();
	useEffect(() => {
		console.log(values, formState.isValid, formState.errors);
	}, [values, formState]);

	const onSubmit: SubmitHandler<Schema> = (data: Schema) => {
		console.dir(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="relative rounded-[10px] z-0 px-[30px] py-[27px] text-white">
				<img
					src="/survey-bg-blur.png"
					alt="blur"
					width={3596}
					height={3616}
					className="absolute inset-0 -z-10 w-full h-full object-cover"
				/>

				<div className="z-0">
					<h1 className="text-accent font-bold text-[34px]/[1] mb-[30px]">
						Заполни простую анкету
					</h1>
					<h2 className="font-bold text-[21px] mb-4">
						Что уже монтировал?
					</h2>

					<Controller
						name="hasMeasurementExperience"
						control={control}
						render={({ field, fieldState }) => (
							<fieldset className="mb-5 flex flex-col gap-[9px] text-base">
								<legend className="font-bold text-[21px] mb-4">
									Опыт замеров
								</legend>
								<RadioButton
									isActive={field.value === true}
									label="Да"
									id="measurements-true"
									onClick={() => {
										setValue(
											"hasMeasurementExperience",
											true,
										);
									}}
								/>
								<p>{field.value}</p>
								<RadioButton
									isActive={field.value === false}
									label="Нет"
									id="measurements-false"
									onClick={() => {
										setValue(
											"hasMeasurementExperience",
											false,
										);
									}}
								/>
							</fieldset>
						)}
					/>
					<div className="mb-5 flex flex-col gap-y-5 [&_input]:(rounded-[5px] w-full px-5 py-[15px] text-black)">
						<Controller
							name="name"
							control={control}
							render={({ field, fieldState }) => (
								<div className="w-full">
									<input {...field} placeholder="Имя" />
									<ErrorMessage>
										{fieldState.error?.message}
									</ErrorMessage>
								</div>
							)}
						/>
						<Controller
							name="phone"
							control={control}
							render={({ field, fieldState }) => (
								<div className="w-full">
									<input
										{...field}
										placeholder="Телефон"
										type="tel"
									/>
									<ErrorMessage>
										{fieldState.error?.message}
									</ErrorMessage>
								</div>
							)}
						/>
					</div>
					<button
						type="submit"
						className="bg-accent py-[14px] mb-[30px] px-auto w-full rounded-[50px] text-black text-lg font-bold"
					>
						Отправить заявку
					</button>

					<p className="text-center text-[12px]">
						Нажимая на данную кнопку вы соглашаетесь <br />с{" "}
						<a href="#" className="underline">
							политикой обработки персональных <br />
							данных
						</a>
					</p>
				</div>
			</div>
		</form>
	);
};

const ErrorMessage = ({ children }: PropsWithChildren) => {
	return <p className="text-red-500">{children}</p>;
};
