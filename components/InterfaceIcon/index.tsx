import styles from "./InterfaceIcon.module.css";
import { propsType, getTxtIconType } from './InterfaceIcon.interface'
import { SettingsIcon } from "../../assets/svg/SettingsIcon";
import { UserIcon } from "../../assets/svg/UserIcon";
import { ShoppingBag } from "../../assets/svg/ShoppingBag";
import { ErrorIcon } from "../../assets/svg/ErrorIcon";
import { useUser } from "../../customHooks/useUser";


export function InterfaceIcon(props: propsType) {
	const user = useUser()
	const txtIcon = getTxtIcon(props.type, props.txt)
	return (
		<div className={styles.container}>
			<div className={styles.iconContainer}>
				{txtIcon.Icon}
				{
					(props.notificationNumber && props.type === 'bag') &&
					<div className={styles.iconNotificationNumber}>
						{props.notificationNumber}
					</div>
				}
			</div>
			<p>
				{
					user?.uid && props.type === 'user'
						? 'Salir'
						: txtIcon.txt
				}
			</p>
		</div>
	)
}


const getTxtIcon = (type: string, txt?: string): getTxtIconType => {
	const fill: string = '#FFFFFF'
	const width: number = 30
	const height: number = 30

	let text: string = ''
	let Icon: JSX.Element = <ErrorIcon fill={fill} width={width} height={height} />
	switch (type) {
		case 'settings':
			text = txt ? txt : 'Config'
			Icon = <SettingsIcon fill={fill} width={width} height={height} />
			break;
		case 'user':
			text = txt ? txt : 'Ingresa' // add condition to switch 'salir'
			Icon = <UserIcon fill={fill} width={width} height={height} />
			break;
		case 'bag':
			text = txt ? txt : 'Canasta'
			Icon = <ShoppingBag fill={fill} width={width} height={height} />
			break;
		default:
			break;
	}
	return { txt: text, Icon }
}