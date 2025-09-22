import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useEffect } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { ArrowButton } from './ui/arrow-button';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// 1. Состояние для примененных настроек
	const [currentAppState, setCurrentAppState] = useState(defaultArticleState);
	// 2. Состояние для открытия/закрытия панели
	const [isPanelOpen, setIsPanelOpen] = useState(false);

	// 3. Эффект для применения текущих настроек к документу
	useEffect(() => {
		// Функция применения настроек
		const applySettings = (state: ArticleStateType) => {
			const root = document.documentElement;
			root.style.setProperty('--font-family', state.fontFamilyOption.value);
			root.style.setProperty('--font-size', state.fontSizeOption.value);
			root.style.setProperty('--font-color', state.fontColor.value);
			root.style.setProperty('--container-width', state.contentWidth.value);
			root.style.setProperty('--bg-color', state.backgroundColor.value);
		};

		applySettings(currentAppState);
	}, [currentAppState]); // Эффект сработает при каждом изменении currentAppState

	// 4. Функция для сброса настроек
	const handleReset = () => {
		setCurrentAppState(defaultArticleState);
	};

	// 5. Функция для применения новых настроек (будет вызвана из формы)
	const handleApply = (newState: ArticleStateType) => {
		setCurrentAppState(newState);
	};

	return (
		<main className={clsx(styles.main)} style={{} as CSSProperties}>
			{/* Кнопка-стрелка для открытия/закрытия панели */}
			<ArrowButton
				isOpen={isPanelOpen}
				onClick={() => setIsPanelOpen(!isPanelOpen)}
			/>

			{/* Передает в форму всё необходимое */}
			<ArticleParamsForm
				isOpen={isPanelOpen}
				onApply={handleApply}
				onReset={handleReset}
				currentAppState={currentAppState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
