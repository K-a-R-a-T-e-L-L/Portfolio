import About from '../About/About';
import Contacts from '../Contacts/Contacts';
import Home from '../Home/Home';
import Projects from '../Projects/Projects';
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
                    <Route path='/contacts' element={<Contacts />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/projects' element={<Projects />} />
                </Routes>
            </div>
        </>
    );
};

export default Layout;