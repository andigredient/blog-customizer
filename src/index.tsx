import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import { backgroundColors } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);


const App = () => {

	const [formState, setFormState] = useState(defaultArticleState)
	const [appState, setAppState] = useState(defaultArticleState)

	const applyState = () => {
		setAppState(formState);
	}

	const defaultState = () => {
		setAppState(defaultArticleState);
		setFormState(defaultArticleState)
	}

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appState.fontFamilyOption.value,
					'--font-size': appState.fontSizeOption.value,
					'--font-color': appState.fontColor.value,
					'--container-width': appState.contentWidth.value,
					'--bg-color': appState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm appState = {formState} setAppState = {setFormState} applyState={applyState} defaultState={defaultState} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
