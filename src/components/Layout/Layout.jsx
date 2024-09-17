import Home from '../Home/Home';
import Skills from '../Skills/Skills';
import style from './styles.module.scss';
import { Routes, Route } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <div className={style.layout}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/skills' element={<Skills />} />
                </Routes>
            </div>
        </>
    );
};

export default Layout;