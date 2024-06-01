import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import { Separator } from 'components/separator';
import { Text } from 'components/text';
import clsx from 'clsx';

//---------------------------------------------------------------------
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';

import React, { FormEvent, useEffect, useState, useRef } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';



type ArticleParamsFormProps = {
	setAppState: React.Dispatch<React.SetStateAction<typeof defaultArticleState>>;

};

//appState: typeof defaultArticleState;

export const ArticleParamsForm = ({ setAppState  }:ArticleParamsFormProps) => {
	const [formState, setFormState] = useState(defaultArticleState);
	const rootRef = useRef(null);

	
	const applyState = () => {
		setAppState(formState);
	}
	
	const setDefaultState = () => {
		setAppState(defaultArticleState);
		setFormState(defaultArticleState)
	}
	
	const [isOpen, setOpen] = useState(false); 

	const handleArrowButtonClick = () => {
		setOpen(!isOpen);
	};

	function outsideClickClose(event: KeyboardEvent) {
		if (event.code == 'Escape') {
			setOpen(false);
		}
	}
	
	useEffect(() => {
		document.addEventListener('keydown', outsideClickClose);

		return () => {
			document.removeEventListener('keydown', outsideClickClose);
		};
	});


	useOutsideClickClose({isOpen, rootRef, onClose:() => setOpen(false), onChange:setOpen})

	
	
	const handleChangeFontFamily = (value: OptionType) => {
		setFormState({ ...formState, fontFamilyOption: value });
	};

	const handleChangeFontSize = (value: OptionType) => {
		setFormState({ ...formState, fontSizeOption: value });
	};

	const handleChangeFontColor = (value: OptionType) => {
		setFormState({ ...formState, fontColor: value });
	};

	const handleChangeBackgroundColor = (value: OptionType) => {
		setFormState({ ...formState, backgroundColor: value });
	};
	
	const handleChangeContentWidth = (value: OptionType) => {
		setFormState({ ...formState, contentWidth: value });
	};


	return (
		
			<div ref = {rootRef}>
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
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							title={'Шрифт'}
							onChange={handleChangeFontFamily}
							
						/>

						<RadioGroup
							selected={formState.fontSizeOption}
							options={fontSizeOptions}
							name={''}
							title={'Размер шрифта'}
							onChange={handleChangeFontSize}


						/>

						<Select
							selected={formState.fontColor}
							options={fontColors}
							title={'Цвет шрифта'}
							onChange={handleChangeFontColor}

						/>

						<Separator />

						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							title={'Цвет фона'}
							onChange={handleChangeBackgroundColor}

						/>

						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							title={'Ширина компонента'}
							onChange={handleChangeContentWidth}

						/>

						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' onClick={setDefaultState}/>
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			</div>
		);
	};
