import { Loading } from 'tdesign-mobile-react';
const Loadings = () => {
  return (
    <>
      <div className="loading-box">
        <Loading theme="spinner" className='loading' />
        <span>Loading</span>
      </div>
    </>
  )
}
export default Loadings;