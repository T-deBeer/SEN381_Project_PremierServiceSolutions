import errorImage from '../assets/404.png';

export default function ErrorPage() {
  return (
    <div className="App">
      <nav></nav>
      <img src={errorImage} alt="" className='h-50 w-25 '/>
      <h1>404 Page not found</h1>
      <h3>Oops! That was not supposed to happen</h3>
    </div>
  );
}
