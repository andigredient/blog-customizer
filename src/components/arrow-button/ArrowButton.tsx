import arrow from 'src/images/arrow.svg';
import React, { useState } from 'react';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';


/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface ComponetsClick {
	isOpen: boolean;
	onClick?: OnClick;
}

export const ArrowButton = (props: ComponetsClick) => {

	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, props.isOpen && (styles.container_open) )}
			onClick={props.onClick}>
			<img src={arrow} alt='иконка стрелочки' className={clsx(styles.arrow, props.isOpen && styles.arrow_open)} />
		</div>
	);
};
