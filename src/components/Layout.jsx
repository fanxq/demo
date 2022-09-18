import { Outlet, useLocation } from 'react-router-dom';
import './Layout.less';

const Layout = (props) => {
    const tLocation = useLocation();
    return (
        <div className='app-layout'>
            <h3 className='title'>登录</h3>
            <div className={tLocation.pathname.toUpperCase() === '/tfa' ? "form-wrapper tfa-form" : 'form-wrapper'}>
                <Outlet />
                <a onClick={(e) => {e.preventDefault();}} className="other-login-option">
                    其他方式登录
                </a>
            </div>
            <div className='banner'></div>
        </div>
    );
}

export default Layout;