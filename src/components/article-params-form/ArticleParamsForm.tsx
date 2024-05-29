import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import { Separator } from 'components/separator';
import { Text } from 'components/text';
import clsx from 'clsx';


import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';

import React, { FormEvent, useEffect, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';


type ArticleParamsFormProps = {
	appState: typeof defaultArticleState;
	setAppState: React.Dispatch<React.SetStateAction<typeof defaultArticleState>>;
	applyState: () => void;
	defaultState: () => void;
};



export const ArticleParamsForm = ({appState, setAppState, applyState, defaultState}:ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState(false); 

	const handleArrowButtonClick = () => {
		setOpen(!isOpen);
	};

	function handleArrowCloseEsc(event: KeyboardEvent) {
		if (event.code == 'Escape') {
			setOpen(false);
		}
	}
	
	useEffect(() => {
		document.addEventListener('keydown', handleArrowCloseEsc);

		return () => {
			document.removeEventListener('keydown', handleArrowCloseEsc);
		};
	});


	const article = document.querySelector("article");
	function handleArrowCloseClick(event:MouseEvent) {
		if (event.target == article) {
			setOpen(false);
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleArrowCloseClick);

		return () => {
			document.removeEventListener('click', handleArrowCloseClick);
		};
	});



	
	
	const handleChangeFontFamily = (value: OptionType) => {
		setAppState({ ...appState, fontFamilyOption: value });
	};

	const handleChangeFontSize = (value: OptionType) => {
		setAppState({ ...appState, fontSizeOption: value });
	};

	const handleChangeFontColor = (value: OptionType) => {
		setAppState({ ...appState, fontColor: value });
	};

	const handleChangeBackgroundColor = (value: OptionType) => {
		setAppState({ ...appState, backgroundColor: value });
	};
	
	const handleChangeContentWidth = (value: OptionType) => {
		setAppState({ ...appState, contentWidth: value });
	};


	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleArrowButtonClick} />

			<aside className={clsx ({[styles.container_open]:isOpen, [styles.container]:!isOpen})}>
				<form className={styles.form} onSubmit={(e:FormEvent) => {
					e.preventDefault();
					applyState()
					}}>
					
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>

					<Select
						selected={appState.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={handleChangeFontFamily}
						
					/>

					<RadioGroup
						selected={appState.fontSizeOption}
						options={fontSizeOptions}
						name={''}
						title={'Размер шрифта'}
						onChange={handleChangeFontSize}


					/>

					<Select
						selected={appState.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={handleChangeFontColor}

					/>

					<Separator />

					<Select
						selected={appState.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={handleChangeBackgroundColor}

					/>

					<Select
						selected={appState.contentWidth}
						options={contentWidthArr}
						title={'Ширина компонента'}
						onChange={handleChangeContentWidth}

					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={defaultState}/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
