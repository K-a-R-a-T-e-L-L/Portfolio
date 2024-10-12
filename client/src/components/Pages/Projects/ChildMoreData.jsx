import ImgSlider from '../../Reused/ImgSlider/ImgSlider';
import style from './styles.module.scss';

const ChildMoreData = ({DisplayButton, MoreDataProject, setMoreDataProject}) => {
    return (
        <div className={style.projects__more_data}>
            <button className={style.more_data__close} onClick={() => { setMoreDataProject() }}>✕</button>
            <h3>{DisplayButton === 'en' ? MoreDataProject.name : MoreDataProject.name_ru}</h3>
            <ImgSlider elements={[1, 2, 3, 4]} />
            <p>{DisplayButton === 'en' ? MoreDataProject.info : MoreDataProject.info_ru}</p>
            <span>Ссылка на проект:&ensp;<a href={MoreDataProject.link} target="_blank" rel="noopener noreferrer">{MoreDataProject.link}</a></span>
        </div>
    );
};

export default ChildMoreData;