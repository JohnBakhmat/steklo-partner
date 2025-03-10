import { zodResolver } from "@hookform/resolvers/zod";
import { type PropsWithChildren, useEffect } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

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
	const { register, handleSubmit, watch, formState, getValues, control } =
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
			<div className="bg-black rounded-[10px] px-[30px] py-[27px] text-white">
				<h1 className="text-accent">Заполни простую анкету</h1>
				<h2>Что уже монтировал?</h2>

				<Controller
					name="hasMeasurementExperience"
					control={control}
					render={({ field }) => (
						<fieldset className="mb-5">
							<legend className="font-bold text-[21px] mb-4">
								Опыт замеров
							</legend>
							<div>
								<input
									{...field}
									defaultChecked
									type="radio"
									id="measurements-true"
									value="true"
								/>
								<label htmlFor="measurements-true">Да</label>
							</div>
							<div>
								<input
									{...field}
									type="radio"
									id="measurements-false"
									value="false"
								/>
								<label htmlFor="measurements-false">Нет</label>
							</div>
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
					className="bg-accent py-[14px] px-auto w-full rounded-[50px] text-black text-lg font-bold"
				>
					Отправить заявку
				</button>
			</div>
		</form>
	);
};

const ErrorMessage = ({ children }: PropsWithChildren) => {
	return <p className="text-red-500">{children}</p>;
};
