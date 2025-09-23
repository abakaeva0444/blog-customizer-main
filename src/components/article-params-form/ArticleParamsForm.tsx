import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
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
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	onApply: (newState: ArticleStateType) => void;
	onReset: () => void;
	currentAppState: ArticleStateType;
}

export const ArticleParamsForm = ({
	onApply,
	onReset,
	currentAppState,
}: ArticleParamsFormProps) => {
	// Состояние для открытия/закрытия панели (внутри компонента)
	const [isOpen, setIsOpen] = useState(false);
	// Локальное состояние для черновика настроек
	const [draftAppState, setDraftAppState] = useState(currentAppState);
	// Ref для обработки клика вне области
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Обновляем черновик при изменении внешнего состояния
	useEffect(() => {
		setDraftAppState(currentAppState);
	}, [currentAppState]);

	// Обработчик клика вне области сайдбара
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node) &&
				isOpen
			) {
				handleClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	// Функции для управления открытием/закрытием
	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	// Обработчик изменений в форме
	const handleChange = (
		fieldName: keyof ArticleStateType,
		newValue: OptionType
	) => {
		setDraftAppState((prevState) => ({
			...prevState,
			[fieldName]: newValue,
		}));
	};

	// Обработчик отправки формы (Применить)
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(draftAppState);
		handleClose();
	};

	// Обработчик сброса формы
	const handleFormReset = () => {
		onReset();
		handleClose();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />

			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleFormReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={draftAppState.fontFamilyOption}
						onChange={(selectedOption) =>
							handleChange('fontFamilyOption', selectedOption)
						}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={draftAppState.fontSizeOption}
						onChange={(selectedOption) =>
							handleChange('fontSizeOption', selectedOption)
						}
					/>

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

					<RadioGroup
						title='Цвет фона'
						name='backgroundColor'
						options={backgroundColors}
						selected={draftAppState.backgroundColor}
						onChange={(selectedOption) =>
							handleChange('backgroundColor', selectedOption)
						}
					/>

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
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
