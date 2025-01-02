import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text'

import styles from './ArticleParamsForm.module.scss';
import { ReactElement, SyntheticEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

export type ArticleParamsFormPropsType = {
	handleApplyNewSettings: (settings: ArticleStateType) => void
}

export const ArticleParamsForm = (props: ArticleParamsFormPropsType) => {
	const [ isOpened, setIsOpened ] = useState(false);

	const [ formState, setFormState ] = useState({...defaultArticleState});

	const asideRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (evt: MouseEvent) => {
			const { target } = evt;
			if (target instanceof Node && (!asideRef.current?.contains(target))) {
				isOpened && setIsOpened(false);
			}			
		};

		window.addEventListener('mousedown', handleClickOutside);

		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
		};
	},[isOpened])

	const { handleApplyNewSettings } = props;

	const toggle = () => {
		!isOpened? setIsOpened(true): setIsOpened(false);
	}

	const reset = () => {
		setFormState({...defaultArticleState});
		handleApplyNewSettings({...defaultArticleState})
	}
	
	const apply = (evt: SyntheticEvent) => {
		evt.preventDefault();
		handleApplyNewSettings({...formState});
	}

	return (
		<>
			<div ref={asideRef}>
			<ArrowButton isOpen={isOpened} onClick={toggle} />
			<aside className={clsx({[styles.container]: true}, {[styles['container_open']]: isOpened})}>
				<form className={styles.form} onSubmit={apply}>
					<Text size = {31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select 
						selected={formState.fontFamilyOption} 
						options={fontFamilyOptions} 
						onChange={(option: OptionType) => {
							setFormState({...formState, fontFamilyOption: option});
						}}
						title='шрифт'
					/>
					<RadioGroup 
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option: OptionType) => {
							setFormState({...formState, fontSizeOption: option});
						}}
						title='рАЗМЕР шрифта'
						name='fontSize'
					/>
					<Select 
						selected={formState.fontColor} 
						options={fontColors} 
						onChange={(option: OptionType) => {
							setFormState({...formState, fontColor: option});
						}}
						title='Цвет шрифта'
					/>
					<Separator/>
					<Select 
						selected={formState.backgroundColor} 
						options={backgroundColors} 
						onChange={(option: OptionType) => {
							setFormState({...formState, backgroundColor: option});
						}}
						title='Цвет фона'
					/>
					<Select 
						selected={formState.contentWidth} 
						options={contentWidthArr} 
						onChange={(option: OptionType) => {
							setFormState({...formState, contentWidth: option});
						}}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={reset}/>
						<Button title='Применить' htmlType='submit' type='apply'/>
					</div>
				</form>
			</aside>
			</div>
		</>
	);
};
