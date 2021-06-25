
import styleDrop from './../Css/dropdownMenu.module.css';

export function DropdownMenu(props) {
	return (
		<div id={styleDrop.container}>
			<input
                id={props.id}
				type="checkbox"
                className={styleDrop.dropdownToggle}
                name="activities"
			></input>
			<label
				htmlFor={props.id}
				id={styleDrop.dropdownTitleToggle}
			>
				<span>{props.name}</span>
				<span id={styleDrop.icon}>
					<i className="fa fa-angle-down" aria-hidden="true"></i>
				</span>
			</label>
            <div id={styleDrop.contentContainer}>
                <span>{`Dificulty: ${props.difficulty}`}</span>
                <span>{`Duration: ${props.duration}`}</span>
                <span>{`Season: ${props.season}`}</span>
            </div>
		</div>
	);
}

export default DropdownMenu;
