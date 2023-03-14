const ErrorFetch = (props) => {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{props.error}</i>
      </p>
    </div>
  );
};

export default ErrorFetch;
