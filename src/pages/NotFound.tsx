const NotFound = () => {
  return (
    <main className="not-found">
      <div>
        <p className="eyebrow"><span /> Page not found</p>
        <h1>404</h1>
        <p>This route does not exist in the portfolio.</p>
        <a className="button button--dark" href={import.meta.env.BASE_URL}>
          Return home
        </a>
      </div>
    </main>
  );
};

export default NotFound;
