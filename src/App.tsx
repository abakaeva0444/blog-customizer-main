import { CSSProperties, useState } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';
import styles from './styles/index.module.scss';

export const App = () => {
	const [currentAppState, setCurrentAppState] = useState(defaultArticleState);

	const handleApply = (newState: ArticleStateType) => {
		setCurrentAppState(newState);
	};

	const handleReset = () => {
		setCurrentAppState(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': currentAppState.fontFamilyOption.value,
					'--font-size': currentAppState.fontSizeOption.value,
					'--font-color': currentAppState.fontColor.value,
					'--container-width': currentAppState.contentWidth.value,
					'--bg-color': currentAppState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onApply={handleApply}
				onReset={handleReset}
				currentAppState={currentAppState}
			/>
			<Article />
		</main>
	);
};
