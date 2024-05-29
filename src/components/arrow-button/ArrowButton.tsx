import arrow from 'src/images/arrow.svg';
import React, { useState } from 'react';
import styles from './ArrowButton.module.scss';

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
			className={props.isOpen ? styles.container_open : styles.container}
			onClick={props.onClick}>
			<img src={arrow} alt='иконка стрелочки' className={styles.arrow} />
		</div>
	);
};
