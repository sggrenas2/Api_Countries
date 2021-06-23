import cardStyle from './../Css/Cards.module.css';
import {Link} from 'react-router-dom';

export function Card(props){

    return (
        <>
            <div className={cardStyle.container}>
                <Link
                    to={`/country/${props.id}`}
                    className={cardStyle.link}
                >
                </Link>
                <img src={props.flag} alt="country" className={cardStyle.flag}/>
                <div className={cardStyle.text}>
                    <h3>{props.name}</h3>
                    <h5>{props.continent}</h5>
                </div>
            </div>
        </>
    )
}

export default Card;