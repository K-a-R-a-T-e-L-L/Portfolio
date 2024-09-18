import { useLocalStorage } from '../../../hooks/useLocalStorage/useLocalStorage';
import BackButton from '../../Reused/BackButton/BackButton';
import LanguageChangeButtons from '../../Reused/LanguageChangeButtons/LanguageChangeButtons';
import style from './styles.module.scss';

const Contacts = () => {

    const [DisplayButton, setDisplayButton] = useLocalStorage('page-language', 'ru');

    return (
        <>
            <div className={style.contacts}>
                <LanguageChangeButtons DisplayButton={DisplayButton} setDisplayButton={setDisplayButton} left={'30px'} />
                <BackButton pathBack={'/'} />
            </div>
        </>
    );
};

export default Contacts;