import './PageLayout.scss';

const PageLayout = ({children}) => {
    return (
        <div className={`page`}>
            {children}
        </div>
    );
}

export default PageLayout;