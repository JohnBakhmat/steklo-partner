import { zodResolver } from "@hookform/resolvers/zod";
import { type PropsWithChildren, useEffect } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Checkbox from "./checkbox";
import { RadioButton } from "./radio-button";

const schema = z.object({
	hasMounted: z.object({
		bathroom: z.boolean().default(false),
		shelves: z.boolean().default(false),
		mirrors: z.boolean().default(false),
		mirrorpanels: z.boolean().default(false),
		glassdividers: z.boolean().default(false),
		stairrailing: z.boolean().default(false),
		glasspatios: z.boolean().default(false),
	}),
	hasMeasurementExperience: z.boolean().default(true),
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
	const { handleSubmit, watch, formState, setValue, control } =
		useForm<Schema>({
			defaultValues: {
				hasMeasurementExperience: true,
				hasMounted: {
					bathroom: false,
					shelves: false,
					mirrors: false,
					mirrorpanels: false,
					glassdividers: false,
					stairrailing: false,
					glasspatios: false,
				},
				name: "",
				phone: "",
			},
			resolver: zodResolver(schema),
		});

	const onSubmit: SubmitHandler<Schema> = (data: Schema) => {
		console.dir(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="rounded-[10px] z-0 text-white overflow-hidden grid lg:grid-cols-[3fr_2fr]">
				<div className="relative z-0 px-[30px] py-[27px]">
					<img
						src="/survey-bg-blur.png"
						alt="blur"
						width={3596}
						height={3616}
						className="absolute inset-0 -z-10 w-full h-full object-cover"
					/>

					<div className="z-0">
						<h1 className="text-accent font-bold text-[34px]/[1] lg:text-[64px] mb-[30px]">
							Заполни простую анкету
						</h1>

						<div className="grid grid-cols-1 lg:grid-cols-2">
							<div>
								<h2 className="font-bold text-[21px] mb-4">
									Что уже монтировал?
								</h2>
								<div className="flex flex-col gap-[7px] mb-[50px]">
									<Controller
										name="hasMounted.bathroom"
										control={control}
										render={({ field }) => (
											<Checkbox
												label="Душевые"
												isChecked={field.value}
												onCheckedChange={(x) =>
													setValue(field.name, x)
												}
											/>
										)}
									/>

									<Controller
										name="hasMounted.shelves"
										control={control}
										render={({ field }) => (
											<Checkbox
												label="Полки"
												isChecked={field.value}
												onCheckedChange={(x) =>
													setValue(field.name, x)
												}
											/>
										)}
									/>
									<Controller
										name="hasMounted.mirrors"
										control={control}
										render={({ field }) => (
											<Checkbox
												label="Зеркала"
												isChecked={field.value}
												onCheckedChange={(x) =>
													setValue(field.name, x)
												}
											/>
										)}
									/>
									<Controller
										name="hasMounted.mirrorpanels"
										control={control}
										render={({ field }) => (
											<Checkbox
												label="Зеркальное панно"
												isChecked={field.value}
												onCheckedChange={(x) =>
													setValue(field.name, x)
												}
											/>
										)}
									/>
									<Controller
										name="hasMounted.glassdividers"
										control={control}
										render={({ field }) => (
											<Checkbox
												label="Стеклянные перегородки"
												isChecked={field.value}
												onCheckedChange={(x) =>
													setValue(field.name, x)
												}
											/>
										)}
									/>
									<Controller
										name="hasMounted.stairrailing"
										control={control}
										render={({ field }) => (
											<Checkbox
												label="Лестничные огражения"
												isChecked={field.value}
												onCheckedChange={(x) =>
													setValue(field.name, x)
												}
											/>
										)}
									/>
									<Controller
										name="hasMounted.glasspatios"
										control={control}
										render={({ field }) => (
											<Checkbox
												label="Стеклянные козырьки"
												isChecked={field.value}
												onCheckedChange={(x) =>
													setValue(field.name, x)
												}
											/>
										)}
									/>
								</div>
							</div>

							<Controller
								name="hasMeasurementExperience"
								control={control}
								render={({ field }) => (
									<fieldset className="mb-5 flex flex-col gap-y-[4.5px] text-base">
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
						</div>
						<div className="mb-5 grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-5 [&_input]:(rounded-[5px] w-full px-5 py-[15px] text-black)">
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

						<div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-y-[30px] gap-x-[13px]">
							<button
								type="submit"
								className="bg-accent py-[14px] px-auto w-full rounded-[50px] text-black text-lg font-bold"
							>
								Отправить заявку
							</button>

							<p className="text-center text-[12px] lg:text-left opacity-80">
								Нажимая на данную кнопку вы соглашаетесь <br />с{" "}
								<a href="#" className="underline">
									политикой обработки персональных <br />
									данных
								</a>
							</p>
						</div>
					</div>
				</div>
				<img
					className="max-lg:hidden w-full h-full object-cover"
					src="/survey-bg.png"
					width={3596}
					height={3616}
				/>
			</div>
		</form>
	);
};

const ErrorMessage = ({ children }: PropsWithChildren) => {
	return <p className="text-red-500">{children}</p>;
};
