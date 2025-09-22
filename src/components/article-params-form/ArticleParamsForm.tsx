import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
interface ArticleParamsFormProps {
	isOpen: boolean;
	onApply: (newState: ArticleStateType) => void;
	onReset: () => void;
	currentAppState: ArticleStateType;
}

export const ArticleParamsForm = ({
	isOpen,
	onApply,
	onReset,
	currentAppState,
}: ArticleParamsFormProps) => {
	// 1. Локальное состояние для черновика настроек
	const [draftAppState, setDraftAppState] = useState(currentAppState);

	// 2. Эффект для обновления черновика при изменении внешнего состояния
	useEffect(() => {
		setDraftAppState(currentAppState);
	}, [currentAppState]);

	// 3. Обработчик изменения любого поля формы
	const handleChange = (fieldName: keyof ArticleStateType, newValue: any) => {
		setDraftAppState((prevState) => ({
			...prevState,
			[fieldName]: newValue,
		}));
	};

	// 4. Обработчик отправки формы (кнопка "Применить")
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault(); // Предотвращает перезагрузку страницы
		onApply(draftAppState); // Передает новые настройки наружу
	};

	// 5. Обработчик сброса формы (кнопка "Сбросить")
	const handleResetForm = () => {
		onReset(); // Сбрасывает настройки в главном состоянии
	};

	return (
		<>
			{/* Панель с формой. */}
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleResetForm}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					{/* Поле выбора шрифта */}
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={draftAppState.fontFamilyOption}
						onChange={(selectedOption) =>
							handleChange('fontFamilyOption', selectedOption)
						}
					/>

					{/* Поле выбора размера шрифта */}
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={draftAppState.fontSizeOption}
						onChange={(selectedOption) =>
							handleChange('fontSizeOption', selectedOption)
						}
					/>

					{/* Поле выбора цвета шрифта */}
					<RadioGroup
						title='Цвет шрифта'
						name='fontColor'
						options={fontColors}
						selected={draftAppState.fontColor}
						onChange={(selectedOption) =>
							handleChange('fontColor', selectedOption)
						}
					/>

					<Separator />

					{/* Поле выбора цвета фона */}
					<RadioGroup
						title='Цвет фона'
						name='backgroundColor'
						options={backgroundColors}
						selected={draftAppState.backgroundColor}
						onChange={(selectedOption) =>
							handleChange('backgroundColor', selectedOption)
						}
					/>

					{/* Поле выбора ширины контента */}
					<RadioGroup
						title='Ширина контента'
						name='contentWidth'
						options={contentWidthArr}
						selected={draftAppState.contentWidth}
						onChange={(selectedOption) =>
							handleChange('contentWidth', selectedOption)
						}
					/>

					<div className={styles.bottomContainer}>
						{/* Кнопка "Сбросить" с типом reset */}
						<Button title='Сбросить' htmlType='reset' type='clear' />
						{/* Кнопка "Применить" с типом submit */}
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
